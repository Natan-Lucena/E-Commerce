import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from '../../schemas/product.schema';
import { EditProductDTO } from 'src/product/dtos';
import { FindByNameUseCaseService } from '../find-by-name-use-case/find-by-name-use-case.service';

@Injectable()
export class EditProductUseCaseService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
    private findProductByName: FindByNameUseCaseService,
  ) {}
  async execute(dto: EditProductDTO): Promise<Product> {
    const product = await this.findProductByName.execute(dto.name);
    if (!product) {
      throw new NotFoundException('Product does not exists');
    }
    product.img = dto.img || product.img;
    product.price_in_cents = dto.price_in_cents || product.price_in_cents;
    product.description = dto.description || product.description;
    const filter = { name: dto.name };
    const update = {
      ...product,
    };

    return await this.productModel.findOneAndUpdate(filter, update, {
      new: true,
    });
  }
}
