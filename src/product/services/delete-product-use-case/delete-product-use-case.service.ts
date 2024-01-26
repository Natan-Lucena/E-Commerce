import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from '../../schemas/product.schema';
import { FindByNameUseCaseService } from '../find-by-name-use-case/find-by-name-use-case.service';

@Injectable()
export class DeleteProductUseCaseService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
    private findProductByName: FindByNameUseCaseService,
  ) {}
  async execute(name: string): Promise<void> {
    const product = await this.findProductByName.execute(name);
    if (!product) {
      throw new NotFoundException('Product does not exists');
    }
    await this.productModel.deleteOne({ name: product.name });
  }
}
