import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './sign-in.service';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { AuthDTO, CreateUserDTO } from 'src/auth/dtos';
import { SignUpService } from '../sign-up/sign-up.service';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

const dto: CreateUserDTO = {
  password: 'new password',
  email: 'MyEmail@gmail.com',
  name: 'New user',
};

const loginDTO: AuthDTO = {
  email: 'MyEmail@gmail.com',
  password: 'new password',
};
describe('SignInService', () => {
  let service: SignInService;
  let signUpService: SignUpService;

  beforeAll(async () => {
    const testDbUri: string = process.env.DB_URL;
    await mongoose.connect(testDbUri);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(testDbUri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [SignInService, SignUpService, ConfigService, JwtService],
    }).compile();

    service = module.get<SignInService>(SignInService);
    signUpService = module.get<SignUpService>(SignUpService);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.collection(User.name).deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to login an user', async () => {
    await signUpService.execute(dto);
    const token = await service.execute(loginDTO);
    expect(token).toHaveProperty('token');
  });

  it('should get an error if uses incorrect email', async () => {
    try {
      const noEmailDto = dto;
      noEmailDto.email = '';
      await service.execute(noEmailDto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should get an error if uses incorrect password', async () => {
    try {
      const noPasswordDto = dto;
      noPasswordDto.password = '';
      await service.execute(noPasswordDto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
