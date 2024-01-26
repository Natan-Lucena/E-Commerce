import { Test, TestingModule } from '@nestjs/testing';
import { GetProductsService } from './get-products.service';
import { CreateProductDTO } from '../../dtos';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../schemas/product.schema';
import 'dotenv/config';
import { CreateProductUseCaseService } from '../create-product-use-case/create-product-use-case.service';

const dto: CreateProductDTO = {
  price_in_cents: 123,
  name: 'Product',
  img: 'URL',
  description: 'New product',
};

describe('GetProductsService', () => {
  let service: GetProductsService;
  let createProductService: CreateProductUseCaseService;

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
      providers: [GetProductsService, CreateProductUseCaseService],
    }).compile();

    service = module.get<GetProductsService>(GetProductsService);
    createProductService = module.get<CreateProductUseCaseService>(
      CreateProductUseCaseService,
    );
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

  it('Should be able to receive a empty array', async () => {
    const products = await service.execute();
    expect(products.length).toBe(0);
  });

  it('Should be able to receive a array of products', async () => {
    await createProductService.execute(dto);
    const products = await service.execute();
    expect(products.length).toBe(1);
  });
});
