import { Module } from '@nestjs/common';
import { CreateProductUseCaseService } from './services/create-product-use-case/create-product-use-case.service';
import { CreateProductUseCaseController } from './controllers/create-product-use-case/create-product-use-case.controller';
import { GetProductsService } from './services/get-products/get-products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { GetProductsController } from './controllers/get-products/get-products.controller';
import { EditUserUseCaseService } from './services/edit-user-use-case/edit-user-use-case.service';
import { FindByNameUseCaseService } from './services/find-by-name-use-case/find-by-name-use-case.service';
import { FindByNameController } from './controllers/find-by-name/find-by-name.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  providers: [CreateProductUseCaseService, GetProductsService, EditUserUseCaseService, FindByNameUseCaseService],
  controllers: [CreateProductUseCaseController, GetProductsController, FindByNameController],
})
export class ProductModule {}
