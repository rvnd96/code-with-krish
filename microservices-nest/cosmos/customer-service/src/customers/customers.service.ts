import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { createCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(
    createCustomerDto: createCustomerDto,
  ): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    const email = createCustomerDto.email;
    if (await this.customerRepository.findOneBy({ email })) {
      throw new ConflictException(`User exists in given email ${email}`);
    }
    return await this.customerRepository.save(customer);
  }

  async findAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOneCustomer(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} is not found`);
    }

    return customer;
  }
}
