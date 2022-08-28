import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumController } from './controller/album.controller';
import { AlbumService } from './service/album.service';
import { AlbumEntity } from './entity/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  exports: [AlbumService],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}
