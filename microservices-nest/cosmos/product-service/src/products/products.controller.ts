import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ReduceQuantity } from './dto/reduce-quantity.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product | null> {
    return this.productsService.getProductById(id);
  }

  @Get(':id/validate')
  async validateStock(
    @Param('id') id: number,
    @Query('quantity') quantity: number,
  ): Promise<{ available: boolean }> {
    return this.productsService.validateStock(id, quantity);
  }

  @Patch(':id/reduce')
  async reduceStock(
    @Param('id') id: number,
    @Body() reduceQuantity: ReduceQuantity,
  ): Promise<Product> {
    if (reduceQuantity.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }
    return this.productsService.reduceProductStock(id, reduceQuantity.quantity);
  }
}
