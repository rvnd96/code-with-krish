import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { createOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly httpService: HttpService,
  ) {}

  // method to check the user exists or not
  private async checkUserExists(
    id: number,
  ): Promise<boolean | AxiosResponse<any>> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:3002/customers/${id}`),
      );
      return response.data;
    } catch (error) {
      return false;
    }
  }

  // method to validate stock
  private async validateStock(id: number, quantity: number): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<{ available: boolean }>(
          `http://localhost:3001/products/${id}/validate?quantity=${quantity}`,
        ),
      );

      return response.data.available;
    } catch (error) {
      return false;
    }
  }

  // method to reduce the product quantity
  private async reduceStock(id: number, quantity: number): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`http://localhost:3001/products/${id}/reduce`, {
          quantity,
        }),
      );

      if (!response.data) {
        throw new BadRequestException(
          `Failed to reduce stock for product ID: ${id}`,
        );
      }
    } catch (error) {
      throw new BadRequestException(`Unable to reduce stock`);
    }
  }

  // create the order
  async create(createOrderDto: createOrderDto): Promise<Order | null> {
    const { customerId, items } = createOrderDto;

    // check user exists or not in the create order, if not throw the exception
    const userAvailable = await this.checkUserExists(customerId);
    if (!userAvailable) {
      throw new NotFoundException(`User with id: ${customerId} is not found`);
    }

    // check the stock availability
    const stockCheckPromises = items.map(async (item) => {
      const isStockAvailable = await this.validateStock(
        item.productId,
        item.quantity,
      );

      if (isStockAvailable === false) {
        throw new BadRequestException(
          `The stock of the item ${item.productId} is less than the requested quantity`,
        );
      }
    });

    await Promise.all(stockCheckPromises);

    // creating order
    const order = this.orderRepository.create({
      customerId,
      status: 'PENDING',
    });

    const savedOrder = await this.orderRepository.save(order);

    const orderItems = items.map((item) =>
      this.orderItemRepository.create({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        order: savedOrder,
      }),
    );

    await this.orderItemRepository.save(orderItems);

    // reduce quantity
    const reduceQuantity = items.map((item) =>
      this.reduceStock(item.productId, item.quantity),
    );
    await Promise.all(reduceQuantity);

    return await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['items'],
    });
  }

  async fetch(id: any) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async fetchAll() {
    return this.orderRepository.find({ relations: ['items'] });
  }

  async updateOrderStatus(id: number, updateStatus: UpdateOrderStatus) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id: ${id} is not found`);
    }
    if (
      order.status === OrderStatus.DELIVERED ||
      order.status == OrderStatus.CANCELLED
    ) {
      throw new BadRequestException(
        `Order status cannot be changed when its delivered or cancelled}`,
      );
    }
    order.status = updateStatus.status;
    return this.orderRepository.save(order);
  }
}
