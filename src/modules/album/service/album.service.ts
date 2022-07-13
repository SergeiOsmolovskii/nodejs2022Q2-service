import { Injectable } from '@nestjs/common';
import { IAlbum } from '../album.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AlbumService {

  private readonly albums: IAlbum[] = [];

  public async getAlbums(): Promise<IAlbum[]> {
    return this.albums;
  }

  public async addAlbum(album: IAlbum): Promise<IAlbum> {
    const newAlbum = { ...album, id: uuid() };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  public async getAlbumById(id: string): Promise<IAlbum> {
    return this.albums.find(album => album.id === id);
  }

  public async updateAlbum(id: string, album: IAlbum): Promise<IAlbum> {
    const index = this.albums.findIndex(album => album.id === id);
    const updatedAlbum = { ...album, id };
    this.albums[index] = updatedAlbum;
    return updatedAlbum;
  }

  public async deleteAlbum(id: string): Promise<IAlbum> {
    const index = this.albums.findIndex(album => album.id === id);
    const album = this.albums[index];
    this.albums.splice(index, 1);
    return album;
  }

}

