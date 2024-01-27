import {
  Controller,
  Delete,
  ForbiddenException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';
import { User } from 'src/auth/schemas/user.schema';
import { DeleteProductUseCaseService } from 'src/product/services/delete-product-use-case/delete-product-use-case.service';

@Controller('product')
@UseGuards(JwtGuard)
export class DeleteProductController {
  constructor(private deleteProductService: DeleteProductUseCaseService) {}

  @Delete('delete/:name')
  async handle(@GetUser() user: User, @Param('name') name: string) {
    if (!user.isAdmin) {
      throw new ForbiddenException('User have no permissions');
    }
    return this.deleteProductService.execute(name);
  }
}
