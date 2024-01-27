import { Module } from '@nestjs/common';
import { SignUpService } from './services/sign-up/sign-up.service';
import { SignInService } from './services/sign-in/sign-in.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { SignInController } from './controllers/sign-in/sign-in.controller';
import { SignUpController } from './controllers/sign-up/sign-up.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({}),
  ],
  providers: [SignUpService, SignInService],
  controllers: [SignInController, SignUpController],
})
export class AuthModule {}
