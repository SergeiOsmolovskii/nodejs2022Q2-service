import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { v4 as uuid } from 'uuid';
import { IArtist } from '../artist.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';

@Injectable()
export class ArtistService {

  constructor(private readonly inMemoryDB: InMemoryDbService) {}


  public async getArtists(): Promise<IArtist[]> {
    return this.inMemoryDB.artists;
  }

  public addArtist(artist: CreateArtistDto): IArtist { 
    const newArtist = { ...artist, id: uuid() };
    this.inMemoryDB.artists.push(newArtist);
    return newArtist;
  }

  public async getArtisiById(id: string): Promise<IArtist> {
    return this.inMemoryDB.artists.find(artist => artist.id === id);
  }

  public async updateArtist(id: string, artist): Promise<IArtist> {
    const index = this.inMemoryDB.artists.findIndex(artist => artist.id === id);
    const updatedArtist = this.inMemoryDB.artists[index] = { ...artist, id };
    return updatedArtist;
  }

  public async deleteArtist(id: string): Promise<void> {
    const index = this.inMemoryDB.artists.findIndex(artist => artist.id === id);
    const artist = this.inMemoryDB.artists[index];
    this.inMemoryDB.artists.splice(index, 1);

    const track = this.inMemoryDB.tracks.findIndex(track => track.artistId === artist.id);

    if (track !== -1) {
      this.inMemoryDB.tracks[track].albumId = null;
      this.inMemoryDB.tracks[track].artistId = null;
    }
  }

}
