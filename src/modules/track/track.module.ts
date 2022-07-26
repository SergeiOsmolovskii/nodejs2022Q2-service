import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackController } from './controller/track.controller';
import { TrackService } from './service/track.service';
import { TrackEntity } from './entity/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  exports: [TrackService],
  controllers: [TrackController],
  providers: [TrackService]
})
export class TrackModule {}
