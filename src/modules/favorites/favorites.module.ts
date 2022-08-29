import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './controller/favorites.controller';
import { FavoritesService } from './service/favorites.service';
import { FaforitesEntity } from './entity/favorite.entity';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FaforitesEntity]), ArtistModule, AlbumModule, TrackModule, AuthModule],
  exports: [FavoritesService],
  controllers: [FavoritesController],
  providers: [FavoritesService]
})
export class FavoritesModule {}
