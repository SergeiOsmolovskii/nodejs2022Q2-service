import { Injectable } from '@nestjs/common';
import { ITrack } from '../track.interface';
import { v4 as uuid } from 'uuid';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class TrackService {
  
  constructor(private readonly inMemoryDB: InMemoryDbService) {}

  public async getTracks(): Promise<ITrack[]> {
    return this.inMemoryDB.tracks;
  }

  public async addTrack(track: ITrack): Promise<ITrack> {
    const newTrack = { ...track, id: uuid() };
    this.inMemoryDB.tracks.push(newTrack);
    return newTrack;
  }

  public async getTrackById(id: string): Promise<ITrack> {
    return this.inMemoryDB.tracks.find(track => track.id === id);
  }

  public async updateTrack(id: string, track: ITrack): Promise<ITrack> {
    const index = this.inMemoryDB.tracks.findIndex(track => track.id === id);
    const updatedTrack = { ...track, id };
    this.inMemoryDB.tracks[index] = updatedTrack;
    return updatedTrack;
  }

  public async deleteTrack(id: string): Promise<void> {
    const index = this.inMemoryDB.tracks.findIndex(track => track.id === id);
    this.inMemoryDB.tracks.splice(index, 1);
  }

}
