import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from '../../schemas/product.schema';

@Injectable()
export class GetProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }
}
