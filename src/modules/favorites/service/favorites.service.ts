import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { IAlbum } from 'src/modules/album/album.interface';
import { IArtist } from 'src/modules/artist/artist.interface';
import { ITrack } from 'src/modules/track/track.interface';
import { IFavorites } from '../favorites.interface';

@Injectable()
export class FavoritesService {

  constructor(private readonly inMemoryDB: InMemoryDbService) {}

  public async getFavorites(): Promise<IFavorites> {      
    const { artistsIds, albumsIds, tracksIds } = this.inMemoryDB.favorites;
    const artists = this.inMemoryDB.artists.filter(artist => artistsIds.includes(artist.id));
    const albums = this.inMemoryDB.albums.filter(album => albumsIds.includes(album.id));
    const tracks = this.inMemoryDB.tracks.filter(track => tracksIds.includes(track.id));   
    return { artists, albums, tracks };
  }

  public async addFavorite(type: string, id:string): Promise<IArtist | IAlbum | ITrack>  {       
    if (type === 'artist') {
      const artist = this.inMemoryDB.artists.find(artist => artist.id === id);

      if (!artist) {
        throw new UnprocessableEntityException('Artist not found');
      }

      this.inMemoryDB.favorites.artistsIds.push(id);
      return artist;
    }

    if (type === 'album') {
      const album = this.inMemoryDB.albums.find(album => album.id === id);

      if (!album) {
        throw new UnprocessableEntityException('Album not found');
      }

      this.inMemoryDB.favorites.albumsIds.push(id);
      return album;
    }

    if (type === 'track') {
      const track = this.inMemoryDB.tracks.find(track => track.id === id);

      if (!track) {
        throw new UnprocessableEntityException('Track not found');
      }

      this.inMemoryDB.favorites.tracksIds.push(id);
      return track;
    }
  }

  public async deleteFavorite(type: string, id: string): Promise<void> {
    
    if (type === 'artist') {
      const index = this.inMemoryDB.favorites.artistsIds.findIndex(artistId => artistId === id);
      this.inMemoryDB.favorites.artistsIds.splice(index, 1);
    }

    if (type === 'album') {
      const index = this.inMemoryDB.favorites.albumsIds.findIndex(albumId => albumId === id);
      this.inMemoryDB.favorites.albumsIds.splice(index, 1);
    }

    if (type === 'track') {
      const index = this.inMemoryDB.favorites.tracksIds.findIndex(trackId => trackId === id);
      this.inMemoryDB.favorites.tracksIds.splice(index, 1);
    }
  }

}
