import { BadRequestException, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { IAlbum } from 'src/modules/album/album.interface';
import { ITrack } from 'src/modules/track/track.interface';
import { checkUUID } from 'src/utils/checkUUID';
import { IFavorites } from '../favorites.interface';
import { FavoritesService } from '../service/favorites.service';

@Controller('favs')
export class FavoritesController {

  constructor(private readonly favoritesService: FavoritesService) {}

@Get()
@HttpCode(HttpStatus.OK)
async getFavorites(): Promise<IFavorites> {  
  return this.favoritesService.getFavorites();
}

@Post('/:type/:id')
@HttpCode(HttpStatus.CREATED)
async addFavorite(@Param('type') type: string, @Param('id') id: string): Promise<| IAlbum | ITrack> {
  if (!checkUUID(id)) throw new BadRequestException(`${type} ID is invalid`);
  return this.favoritesService.addFavorite(type, id);
}

@Delete('/:type/:id')
@HttpCode(HttpStatus.NO_CONTENT)
async deleteFavorite(@Param('type') type: string, @Param('id') id: string): Promise<void> {
  if (!checkUUID(id)) throw new BadRequestException(`${type} ID is invalid`);
  return this.favoritesService.deleteFavorite(type, id);
  }
}
