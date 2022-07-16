import { Module } from '@nestjs/common';
import { ArtistService } from './service/artist.service';
import { ArtistController } from './controller/artist.controller';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryDbService],
})
export class ArtistModule {}
