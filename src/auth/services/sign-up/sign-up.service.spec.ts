import { Test, TestingModule } from '@nestjs/testing';
import { SignUpService } from './sign-up.service';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { CreateUserDTO } from '../../dtos';
import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const dto: CreateUserDTO = {
  password: 'new password',
  email: 'MyEmail@gmail.com',
  name: 'New user',
};

describe('SignUpService', () => {
  let service: SignUpService;

  beforeAll(async () => {
    const testDbUri: string = process.env.DB_URL;
    await mongoose.connect(testDbUri);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(testDbUri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [SignUpService, ConfigService],
    }).compile();

    service = module.get<SignUpService>(SignUpService);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.collection('Users').deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to register an user', async () => {
    const user = await service.execute(dto);
    expect(user).toHaveProperty('id');
  });

  it('should get an error if try to user an already credential', async () => {
    try {
      await service.execute(dto);
      await service.execute(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should be able to register an user that is admin', async () => {
    dto.isAdmin = true;
    const user = await service.execute(dto);
    expect(user.isAdmin).toBe(true);
  });
});
