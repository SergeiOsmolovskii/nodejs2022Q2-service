import { Injectable } from '@nestjs/common';
import { IAlbum } from '../album.interface';
import { v4 as uuid } from 'uuid';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class AlbumService {

  constructor(private inMemoryDB: InMemoryDbService) {}

  public async getAlbums(): Promise<IAlbum[]> {
    return this.inMemoryDB.albums;
  }

  public async addAlbum(album: IAlbum): Promise<IAlbum> {
    const newAlbum = { ...album, id: uuid() };
    this.inMemoryDB.albums.push(newAlbum);
    return newAlbum;
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    return this.inMemoryDB.albums.find(album => album.id === id);
  }

  public async updateAlbum(id: string, album: IAlbum): Promise<IAlbum> {
    const index = this.inMemoryDB.albums.findIndex(album => album.id === id);
    const updatedAlbum = { ...album, id };
    this.inMemoryDB.albums[index] = updatedAlbum;
    return updatedAlbum;
  }

  public async deleteAlbum(id: string): Promise<void> {
    const index = this.inMemoryDB.albums.findIndex(album => album.id === id);
    const album = this.inMemoryDB.albums[index];
    const track = this.inMemoryDB.tracks.findIndex(track => track.albumId === album.id);
    
    if (track !== -1) {
      this.inMemoryDB.tracks[track].albumId = null;
      return null;
    }
    this.inMemoryDB.albums.splice(index, 1);
  }

}

