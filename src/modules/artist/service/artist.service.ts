import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { IArtist } from '../artist.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';

@Injectable()
export class ArtistService {

  private readonly artists: IArtist[] = [];

  public async getArtists(): Promise<IArtist[]> {
    return this.artists;
  }

  public addArtist(artist: CreateArtistDto): IArtist { 
    const newArtist = { ...artist, id: uuid() };
    this.artists.push(newArtist);
    return newArtist;
  }

  public async getArtisiById(id: string): Promise<IArtist> {
    return this.artists.find(artist => artist.id === id);
  }

  public async updateArtist(id: string, artist): Promise<IArtist> {
    const index = this.artists.findIndex(artist => artist.id === id);
    const updatedArtist = this.artists[index] = { ...artist, id };
    return updatedArtist;
  }

  public async deleteArtist(id: string): Promise<IArtist> {
    const index = this.artists.findIndex(artist => artist.id === id);
    const artist = this.artists[index];
    this.artists.splice(index, 1);
    return artist;
  }

}
