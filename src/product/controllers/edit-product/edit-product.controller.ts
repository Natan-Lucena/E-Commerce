import { Body, Controller, Patch } from '@nestjs/common';
import { EditProductDTO } from 'src/product/dtos';
import { EditProductUseCaseService } from 'src/product/services/edit-product-use-case/edit-product-use-case.service';

@Controller('product')
export class EditProductController {
  constructor(private editProductUseCase: EditProductUseCaseService) {}
  @Patch('edit')
  async handle(@Body() dto: EditProductDTO) {
    return this.editProductUseCase.execute(dto);
  }
}
