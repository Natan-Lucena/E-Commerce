import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from '../../dtos';
import * as argon from 'argon2';

@Injectable()
export class SignInService {
  constructor(
    @InjectModel(User.name) private productModel: mongoose.Model<User>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async execute({ password, email }: AuthDTO) {
    const user = await this.productModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Credentials incorrect');
    }
    const passwordMatch = await argon.verify(user.password, password);
    if (!passwordMatch) {
      throw new NotFoundException('Credentials incorrect');
    }
    return await this.signToken(user.name, email);
  }

  private async signToken(
    userName: string,
    email: string,
  ): Promise<{ token: string }> {
    const payload = {
      sub: userName,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return { token };
  }
}
