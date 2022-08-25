import { Module } from '@nestjs/common';
import { AlbumController } from './controller/album.controller';
import { AlbumService } from './service/album.service';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, InMemoryDbService]
})
export class AlbumModule {}
