import { Injectable } from '@nestjs/common';
import { IFavoritesIds } from 'src/modules/favorites/favorites.interface';

@Injectable()
export class InMemoryDbService {
  
  private static instance;
  
  constructor() {
    if(!InMemoryDbService.instance) {
      InMemoryDbService.instance = this
    }
    return InMemoryDbService.instance;
  }

  public albums = [];
  public artists = [];
  public tracks = [];
  public favorites: IFavoritesIds = {
    artistsIds: [],
    albumsIds: [],
    tracksIds: [],
  };
}
