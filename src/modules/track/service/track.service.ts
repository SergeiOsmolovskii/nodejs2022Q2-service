import { Injectable } from '@nestjs/common';
import { ITrack } from '../track.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TrackService {
  
  private readonly tracks: ITrack[] = [];

  public async getTracks(): Promise<ITrack[]> {
    return this.tracks;
  }

  public async addTrack(track: ITrack): Promise<ITrack> {
    const newTrack = { ...track, id: uuid() };
    this.tracks.push(newTrack);
    return newTrack;
  }

  public async getTrackById(id: string): Promise<ITrack> {
    return this.tracks.find(track => track.id === id);
  }

  public async updateTrack(id: string, track: ITrack): Promise<ITrack> {
    const index = this.tracks.findIndex(track => track.id === id);
    const updatedTrack = { ...track, id };
    this.tracks[index] = updatedTrack;
    return updatedTrack;
  }

  public async deleteTrack(id: string): Promise<ITrack> {
    const index = this.tracks.findIndex(track => track.id === id);
    const track = this.tracks[index];
    this.tracks.splice(index, 1);
    return track;
  }

}
