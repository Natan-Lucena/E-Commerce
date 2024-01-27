import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/auth/dtos';
import { SignUpService } from 'src/auth/services/sign-up/sign-up.service';

@Controller('auth')
export class SignUpController {
  constructor(private signUpService: SignUpService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async handle(@Body() dto: CreateUserDTO) {
    return this.signUpService.execute(dto);
  }
}
