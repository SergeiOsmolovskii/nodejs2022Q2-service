import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';

@Module({
  controllers: [UserController],
  providers: [UserService, InMemoryDbService]
})
export class UserModule {}
