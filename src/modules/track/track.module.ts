import { Module } from '@nestjs/common';
import { TrackController } from './controller/track.controller';
import { TrackService } from './service/track.service';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, InMemoryDbService]
})
export class TrackModule {}
