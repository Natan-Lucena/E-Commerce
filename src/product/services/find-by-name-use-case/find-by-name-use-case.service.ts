import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from '../../schemas/product.schema';

@Injectable()
export class FindByNameUseCaseService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
  ) {}
  async execute(name: string): Promise<Product> {
    return this.productModel.findOne({ name });
  }
}
