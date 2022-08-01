import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
