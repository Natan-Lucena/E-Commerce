import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsNumber()
  price_in_cents: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  img: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
