import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteProductUseCaseService } from 'src/product/services/delete-product-use-case/delete-product-use-case.service';

@Controller('product')
export class DeleteProductController {
  constructor(private deleteProductService: DeleteProductUseCaseService) {}

  @Delete('delete/:name')
  async handle(@Param('name') name: string) {
    return this.deleteProductService.execute(name);
  }
}
