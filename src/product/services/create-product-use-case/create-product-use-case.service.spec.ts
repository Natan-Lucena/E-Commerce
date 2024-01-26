import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateProductUseCaseService } from './create-product-use-case.service';
import { CreateProductDTO } from '../../dtos';
import { Product, ProductSchema } from '../../schemas/product.schema';
import { ForbiddenException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import 'dotenv/config';

const dto: CreateProductDTO = {
  price_in_cents: 123,
  name: 'Product',
  img: 'URL',
  description: 'New product',
};

describe('CreateProductUseCaseService', () => {
  let service: CreateProductUseCaseService;

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
      providers: [CreateProductUseCaseService],
    }).compile();

    service = module.get<CreateProductUseCaseService>(
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

  it('should insert a new product', async () => {
    const newProduct = await service.execute(dto);
    expect(newProduct.name).toEqual(dto.name);
  });

  it('should throw ForbiddenException if product already exists', async () => {
    try {
      await service.execute(dto);
      await service.execute(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });
});
