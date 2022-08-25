import { Module } from '@nestjs/common';
import { FavoritesController } from './controller/favorites.controller';
import { FavoritesService } from './service/favorites.service';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryDbService]
})
export class FavoritesModule {}
