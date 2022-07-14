import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
