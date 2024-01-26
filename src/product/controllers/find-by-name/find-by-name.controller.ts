import { Controller, Get, Param } from '@nestjs/common';
import { FindByNameUseCaseService } from 'src/product/services/find-by-name-use-case/find-by-name-use-case.service';

@Controller('product')
export class FindByNameController {
  constructor(private findByNameService: FindByNameUseCaseService) {}

  @Get('findByName/:name')
  async handle(@Param('name') name: string) {
    return this.findByNameService.execute(name);
  }
}
