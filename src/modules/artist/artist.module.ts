import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistService } from './service/artist.service';
import { ArtistController } from './controller/artist.controller';
import { ArtistEntity } from './entity/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  exports: [ArtistService],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
