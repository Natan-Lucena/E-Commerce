import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditProductDTO {
  @IsOptional()
  @IsNumber()
  price_in_cents?: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  img?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
