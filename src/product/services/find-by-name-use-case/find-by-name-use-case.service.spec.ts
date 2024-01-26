import { Test, TestingModule } from '@nestjs/testing';
import { FindByNameUseCaseService } from './find-by-name-use-case.service';
import { CreateProductDTO } from 'src/product/dtos';
import { CreateProductUseCaseService } from '../create-product-use-case/create-product-use-case.service';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../schemas/product.schema';

const dto: CreateProductDTO = {
  price_in_cents: 123,
  name: 'Product',
  img: 'URL',
  description: 'New product',
};

describe('FindByNameUseCaseService', () => {
  let service: FindByNameUseCaseService;
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
      providers: [FindByNameUseCaseService, CreateProductUseCaseService],
    }).compile();

    service = module.get<FindByNameUseCaseService>(FindByNameUseCaseService);
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

  it('Should be able to receive a null value', async () => {
    const product = await service.execute('');
    expect(product).toBe(null);
  });
  it('Should be able to receive a array of products', async () => {
    await createProductService.execute(dto);
    const product = await service.execute(dto.name);
    expect(product.name).toBe(dto.name);
  });
});
