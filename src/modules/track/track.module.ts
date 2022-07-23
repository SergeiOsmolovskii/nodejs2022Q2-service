import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackController } from './controller/track.controller';
import { TrackService } from './service/track.service';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';
import { TrackEntity } from './entity/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TrackController],
  providers: [TrackService, InMemoryDbService]
})
export class TrackModule {}
