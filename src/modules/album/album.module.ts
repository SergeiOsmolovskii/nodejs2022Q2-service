import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from './controller/album.controller';
import { AlbumService } from './service/album.service';
import { AlbumEntity } from './entity/album.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), AuthModule],
  exports: [AlbumService],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
