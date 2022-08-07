import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { FavoritesService } from '../service/favorites.service';
import { AllExceptionFilter } from '../../../logging/allException.filter';

@UseGuards(JwtAuthGuard)
@Controller('favs')
export class FavoritesController {

  constructor(private readonly favoritesService: FavoritesService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseFilters(AllExceptionFilter)
  async getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('/:type/:id')
  @HttpCode(HttpStatus.CREATED)
  @UseFilters(AllExceptionFilter)
  async addFavorite(@Param('type') type: string, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addFavorite(type, id);
  }

  @Delete('/:type/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseFilters(AllExceptionFilter)
  async deleteFavorite(@Param('type') type: string, @Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.favoritesService.deleteFavorite(type, id);
  }
}
