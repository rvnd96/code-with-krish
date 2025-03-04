import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { createOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Kafka } from 'kafkajs';

@Injectable()
export class OrdersService implements OnModuleInit {
  private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
  private readonly producer = this.kafka.producer();
  private readonly consumer = this.kafka.consumer({
    groupId: 'rmadushan-order-service',
  });

  private readonly inventoryServiceUrl = 'http://localhost:3001/products';
  private readonly customerServiceUrl = 'http://localhost:3002/customers';

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly httpService: HttpService,
  ) {}

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumeConfirmedOrders();
  }

  // create the order
  async create(createOrderDto: createOrderDto): Promise<any> {
    const { customerId, city, items } = createOrderDto;

    // Validate customer exists
    let customerName = '';
    try {
      const res = this.httpService.get(
        `${this.customerServiceUrl}/${customerId}`,
      );
      const response = await lastValueFrom(res);
      customerName = response.data.name;
    } catch (error) {
      throw new BadRequestException(
        `Customer ID ${customerId} does not exist.`,
      );
    }

    // produce order as an event
    this.producer.send({
      topic: `rmadushan.order.create`,
      messages: [
        {
          value: JSON.stringify({ customerId, city, customerName, items }),
        },
      ],
    });
    return { message: `Order is placed. waiting inventory service to process` };

    // check product availability
    /*
    for (const item of items) {
      try {
        const res = this.httpService.get(
          `${this.inventoryServiceUrl}/${item.productId}/validate?quantity=${item.quantity}`,
        );
        const response = await lastValueFrom(res);
        if (!response.data.available) {
          throw new BadRequestException(
            `Product ID ${item.productId} is out of stock.`,
          );
        }
      } catch (error) {
        throw new BadRequestException(
          `Error checking stock for Product ID ${item.productId}: ${error.message}`,
        );
      }
    }

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
    const savedOrderItems = await this.orderItemRepository.save(orderItems);

    // Reduce stock in Inventory Service
    for (const item of savedOrderItems) {
      try {
        await lastValueFrom(
          this.httpService.patch(
            `${this.inventoryServiceUrl}/${item.productId}/quantity`,
            { quantity: item.quantity },
          ),
        );
      } catch (error) {
        throw new BadRequestException(
          `Failed to reduce stock for Product ID ${item.productId}`,
        );
      }
    }
    return { ...savedOrder, customerName, items: orderItems };
    */
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

  async consumeConfirmedOrders() {
    await this.consumer.subscribe({
      topic: `rmadushan.order.inventory.update`,
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log('getting a msg (to order from inventory saying the invery updated).....');
        if (!message.value) {
          throw new BadRequestException('Message value is null');
        }
        const { customerId, city, items } = JSON.parse(message.value.toString());

        const order = this.orderRepository.create({
          customerId,
          city,
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

        // // producing notification
        // await this.producer.send({
        //   topic: `rmadushan.order.created.notification`,
        //   messages: [
        //     {
        //       value: JSON.stringify({ message: `Order created successfully!` }),
        //     },
        //   ],
        // });

        // order confirmed
        await this.producer.send({
          topic: `rmadushan.order.confirmed`,
          messages: [
            {
              value: JSON.stringify(order)
            }
          ]
        })
      },
    });
  }
}
