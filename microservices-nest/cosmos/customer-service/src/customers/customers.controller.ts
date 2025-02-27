import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { createCustomerDto } from './dto/customer.dto';
import { Customer } from './entity/customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Post()
  async createCustomer(
    @Body() createCustomerDto: createCustomerDto,
  ): Promise<Customer | null> {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @Get()
  async findAllCustomers() {
    return this.customerService.findAllCustomers();
  }

  @Get(':id')
  async findOneCustomer(@Param('id') id: number) {
    return this.customerService.findOneCustomer(id);
  }
}
