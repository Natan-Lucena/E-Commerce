import { Controller, Get } from '@nestjs/common';
import { Product } from 'src/product/schemas/product.schema';
import { GetProductsService } from 'src/product/services/get-products/get-products.service';

@Controller('product')
export class GetProductsController {
  constructor(private getProductUseCase: GetProductsService) {}

  @Get('get')
  async handle(): Promise<Product[]> {
    return await this.getProductUseCase.execute();
  }
}
