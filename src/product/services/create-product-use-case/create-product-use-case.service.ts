import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateProductDTO } from '../../dtos';
import { Product } from '../../schemas/product.schema';

@Injectable()
export class CreateProductUseCaseService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
  ) {}
  async execute(dto: CreateProductDTO): Promise<Product> {
    const productAlreadyExists = await this.productModel.findOne({
      name: dto.name,
    });
    if (productAlreadyExists) {
      throw new ForbiddenException('Product Already Exists');
    }
    const productObject = new Product(dto);
    const product = await this.productModel.create(productObject);
    return product;
  }
}
