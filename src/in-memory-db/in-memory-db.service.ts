import { Injectable } from '@nestjs/common';
import { IAlbum } from 'src/modules/album/album.interface';
import { IArtist } from 'src/modules/artist/artist.interface';
import { IFavoritesIds } from 'src/modules/favorites/favorites.interface';
import { ITrack } from 'src/modules/track/track.interface';

@Injectable()
export class InMemoryDbService {
  
  private static instance;
  
  constructor() {
    if(!InMemoryDbService.instance) {
      InMemoryDbService.instance = this
    }
    return InMemoryDbService.instance;
  }

  public albums: IAlbum[] = [];
  public artists: IArtist[] = [];
  public tracks: ITrack[] = [];
  public favorites: IFavoritesIds = {
    artistsIds: [],
    albumsIds: [],
    tracksIds: [],
  };
}
