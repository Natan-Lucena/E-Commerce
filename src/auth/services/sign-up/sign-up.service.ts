import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateUserDTO } from '../../dtos';
import { User } from '../../schemas/user.schema';
import * as argon from 'argon2';

@Injectable()
export class SignUpService {
  constructor(
    @InjectModel(User.name) private productModel: mongoose.Model<User>,
    private config: ConfigService,
  ) {}

  async execute(dto: CreateUserDTO) {
    const userExists = await this.productModel.findOne({ name: dto.name });
    if (userExists) {
      throw new ForbiddenException('Name already taken');
    }
    dto.password = await argon.hash(dto.password);
    const user = await this.productModel.create({ ...dto });
    delete user.password;
    return user;
  }
}
