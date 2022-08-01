import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackController } from './controller/track.controller';
import { TrackService } from './service/track.service';
import { TrackEntity } from './entity/track.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]), AuthModule],
  exports: [TrackService],
  controllers: [TrackController],
  providers: [TrackService]
})
export class TrackModule {}
