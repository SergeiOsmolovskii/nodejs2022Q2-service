import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { FavoritesService } from '../service/favorites.service';

@UseGuards(JwtAuthGuard)
@Controller('favs')
export class FavoritesController {

  constructor(private readonly favoritesService: FavoritesService) {}

@Get()
@HttpCode(HttpStatus.OK)
async getFavorites() {  
  return this.favoritesService.getFavorites();
}

@Post('/:type/:id')
@HttpCode(HttpStatus.CREATED)
async addFavorite(@Param('type') type: string, @Param('id', new ParseUUIDPipe()) id: string) {
  return this.favoritesService.addFavorite(type, id);
}

@Delete('/:type/:id')
@HttpCode(HttpStatus.NO_CONTENT)
async deleteFavorite(@Param('type') type: string, @Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
  return this.favoritesService.deleteFavorite(type, id);
  }
}
