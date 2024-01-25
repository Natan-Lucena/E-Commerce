import { Module } from '@nestjs/common';
import { CreateProductUseCaseService } from './services/create-product-use-case/create-product-use-case.service';
import { CreateProductUseCaseController } from './controllers/create-product-use-case/create-product-use-case.controller';
import { GetProductsService } from './services/get-products/get-products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { GetProductsController } from './controllers/get-products/get-products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  providers: [CreateProductUseCaseService, GetProductsService],
  controllers: [CreateProductUseCaseController, GetProductsController],
})
export class ProductModule {}
