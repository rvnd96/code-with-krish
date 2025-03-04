import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { createProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  async createProduct(
    @Body() creatProductDto: createProductDto,
  ): Promise<Product | null> {
    return await this.productService.createProduct(creatProductDto);
  }

  @Get()
  async findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: number) {
    return this.productService.findOneProduct(id);
  }

  @Get(':id/validate')
  async validateStock(@Param('id') id: number, @Query('quantity') quantity: number) {
    return this.productService.validateStock(id, quantity)
  }
}
