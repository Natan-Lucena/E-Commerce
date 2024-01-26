import { Test, TestingModule } from '@nestjs/testing';
import { EditProductUseCaseService } from './edit-product-use-case.service';
import { CreateProductUseCaseService } from '../create-product-use-case/create-product-use-case.service';
import { CreateProductDTO } from 'src/product/dtos';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../schemas/product.schema';
import { NotFoundException } from '@nestjs/common';
import { FindByNameUseCaseService } from '../find-by-name-use-case/find-by-name-use-case.service';

const dto: CreateProductDTO = {
  price_in_cents: 123,
  name: 'Product',
  img: 'URL',
  description: 'New product',
};

describe('EditProductUseCaseService', () => {
  let service: EditProductUseCaseService;
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
      providers: [
        EditProductUseCaseService,
        CreateProductUseCaseService,
        FindByNameUseCaseService,
      ],
    }).compile();

    service = module.get<EditProductUseCaseService>(EditProductUseCaseService);
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

  it('should get a error if product does not exists', async () => {
    try {
      await service.execute(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
  it('should be able to edit a product', async () => {
    await createProductService.execute(dto);
    dto.description = 'New descrition';
    const editProduct = await service.execute(dto);
    expect(editProduct.description).toBe(dto.description);
  });
});
