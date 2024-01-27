import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDTO } from 'src/auth/dtos';
import { SignInService } from 'src/auth/services/sign-in/sign-in.service';

@Controller('auth')
export class SignInController {
  constructor(private signInService: SignInService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async handle(@Body() dto: AuthDTO) {
    return this.signInService.execute(dto);
  }
}
