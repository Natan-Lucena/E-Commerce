import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateProductDTO } from '../dtos';

@Schema({ timestamps: true, collection: 'Product' })
export class Product {
  constructor({ price_in_cents, name, img, description }: CreateProductDTO) {
    this.price_in_cents = price_in_cents;
    this.name = name;
    this.img = img;
    this.description = description;
  }
  @Prop({})
  price_in_cents: number;
  @Prop()
  name: string;
  @Prop()
  img: string;
  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
