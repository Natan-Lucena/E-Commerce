import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProductUseCaseService } from './delete-product-use-case.service';
import { CreateProductUseCaseService } from '../create-product-use-case/create-product-use-case.service';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../schemas/product.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from 'src/product/dtos';
import { FindByNameUseCaseService } from '../find-by-name-use-case/find-by-name-use-case.service';
import { GetProductsService } from '../get-products/get-products.service';

const dto: CreateProductDTO = {
  price_in_cents: 123,
  name: 'Product',
  img: 'URL',
  description: 'New product',
};

describe('DeleteProductUseCaseService', () => {
  let service: DeleteProductUseCaseService;
  let createProductService: CreateProductUseCaseService;
  let getProductsService: GetProductsService;

  beforeAll(async () => {
    const testDbUri: string = process.env.DB_URL;
    await mongoose.connect(testDbUri);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(testDbUri),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
      ],
      providers: [
        DeleteProductUseCaseService,
        CreateProductUseCaseService,
        FindByNameUseCaseService,
        GetProductsService,
      ],
    }).compile();

    service = module.get<DeleteProductUseCaseService>(
      DeleteProductUseCaseService,
    );
    createProductService = module.get<CreateProductUseCaseService>(
      CreateProductUseCaseService,
    );
    getProductsService = module.get<GetProductsService>(GetProductsService);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.collection('Product').deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a error if product does not exists', async () => {
    try {
      await service.execute(dto.name);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should be able to delete a product', async () => {
    await createProductService.execute(dto);
    await service.execute(dto.name);
    const products = await getProductsService.execute();
    expect(products.length).toBe(0);
  });
});
