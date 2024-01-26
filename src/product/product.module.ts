import { Module } from '@nestjs/common';
import { CreateProductUseCaseService } from './services/create-product-use-case/create-product-use-case.service';
import { CreateProductUseCaseController } from './controllers/create-product-use-case/create-product-use-case.controller';
import { GetProductsService } from './services/get-products/get-products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { GetProductsController } from './controllers/get-products/get-products.controller';
import { FindByNameUseCaseService } from './services/find-by-name-use-case/find-by-name-use-case.service';
import { FindByNameController } from './controllers/find-by-name/find-by-name.controller';
import { EditProductUseCaseService } from './services/edit-product-use-case/edit-product-use-case.service';
import { EditProductController } from './controllers/edit-product/edit-product.controller';
import { DeleteProductUseCaseService } from './services/delete-product-use-case/delete-product-use-case.service';
import { DeleteProductController } from './controllers/delete-product/delete-product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  providers: [
    CreateProductUseCaseService,
    GetProductsService,
    EditProductUseCaseService,
    FindByNameUseCaseService,
    DeleteProductUseCaseService,
  ],
  controllers: [
    CreateProductUseCaseController,
    GetProductsController,
    FindByNameController,
    EditProductController,
    DeleteProductController,
  ],
})
export class ProductModule {}
