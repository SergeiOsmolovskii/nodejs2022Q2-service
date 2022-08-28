import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entity/track.entity';

@Injectable()
export class TrackService {

  constructor(
    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<TrackEntity>,
  ) { }

  public async getTracks(): Promise<TrackEntity[]> {
    return this.tracksRepository.find();
  }

  public async addTrack(trackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = this.tracksRepository.create(trackDto);
    return this.tracksRepository.save(newTrack);
  }

  public async getTrackById(id: string): Promise<TrackEntity> {
    const currentTrack = await this.tracksRepository.findOneBy({ id });
    if (!currentTrack) throw new NotFoundException(`Track with ${id} not found`);
    return currentTrack;
  }

  public async updateTrack(id: string, track: UpdateTrackDto): Promise<TrackEntity> {
    const currentTrack = await this.tracksRepository.findOneBy({ id });
    if (!currentTrack) throw new NotFoundException(`Track with ${id} not found`);
    return await this.tracksRepository.save({ ...currentTrack, ...track });
  }

  public async deleteTrack(id: string): Promise<void> {
    const currentTrack = await this.tracksRepository.findOneBy({ id });
    if (!currentTrack) throw new NotFoundException(`Track with ${id} not found`);
    await this.tracksRepository.remove(currentTrack);
  }
}