import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDTO } from 'src/product/dtos';
import { Product } from 'src/product/schemas/product.schema';
import { CreateProductUseCaseService } from 'src/product/services/create-product-use-case/create-product-use-case.service';

@Controller('product')
export class CreateProductUseCaseController {
  constructor(private createProductUseCase: CreateProductUseCaseService) {}
  @Post('create')
  async handle(@Body() dto: CreateProductDTO): Promise<Product> {
    return this.createProductUseCase.execute(dto);
  }
}
