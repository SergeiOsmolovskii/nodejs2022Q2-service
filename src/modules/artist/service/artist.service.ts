import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { IArtist } from '../artist.interface';

@Injectable()
export class ArtistService {

  private readonly artists: IArtist[] = [];

  public async getArtists(): Promise<IArtist[]> {
    return this.artists;
  }

  public async addArtist(artist): Promise<IArtist> { 
    this.artists.push({ ...artist, id: uuid() });
    return artist;
  }

  public async getArtisiById(id: string): Promise<IArtist> {
    return this.artists.find(artist => artist.id === id);
  }

  public async updateArtist(id: string, artist): Promise<IArtist> {
    const index = this.artists.findIndex(artist => artist.id === id);
    this.artists[index] = { ...artist, id };
    return artist;
  }

  public async deleteArtist(id: string): Promise<IArtist> {
    const index = this.artists.findIndex(artist => artist.id === id);
    const artist = this.artists[index];
    this.artists.splice(index, 1);
    return artist;
  }

}
