import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserService } from '../user/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    })
  ],
  exports: [AuthService, JwtModule],
  providers: [AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
