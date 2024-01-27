import {
  Body,
  Controller,
  ForbiddenException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';
import { User } from 'src/auth/schemas/user.schema';
import { EditProductDTO } from 'src/product/dtos';
import { EditProductUseCaseService } from 'src/product/services/edit-product-use-case/edit-product-use-case.service';

@Controller('product')
@UseGuards(JwtGuard)
export class EditProductController {
  constructor(private editProductUseCase: EditProductUseCaseService) {}
  @Patch('edit')
  async handle(@GetUser() user: User, @Body() dto: EditProductDTO) {
    if (!user.isAdmin) {
      throw new ForbiddenException('User have no permissions');
    }
    return this.editProductUseCase.execute(dto);
  }
}
