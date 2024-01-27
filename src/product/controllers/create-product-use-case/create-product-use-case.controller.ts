import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';
import { User } from 'src/auth/schemas/user.schema';
import { CreateProductDTO } from 'src/product/dtos';
import { Product } from 'src/product/schemas/product.schema';
import { CreateProductUseCaseService } from 'src/product/services/create-product-use-case/create-product-use-case.service';

@Controller('product')
@UseGuards(JwtGuard)
export class CreateProductUseCaseController {
  constructor(private createProductUseCase: CreateProductUseCaseService) {}
  @Post('create')
  async handle(
    @GetUser() user: User,
    @Body() dto: CreateProductDTO,
  ): Promise<Product> {
    if (!user.isAdmin) {
      throw new ForbiddenException('User have no permissions');
    }
    return this.createProductUseCase.execute(dto);
  }
}
