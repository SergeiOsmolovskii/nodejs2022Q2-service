import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { ArtistEntity } from '../entity/artist.entity';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistService {

  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<ArtistEntity>,
  ) {}

  public async getArtists() {
    return this.artistsRepository.find();
  }

  public addArtist(artistDto: CreateArtistDto) { 
    const newArtist = this.artistsRepository.create(artistDto);
    return this.artistsRepository.save(newArtist);
  }

  public async getArtisiById(id: string) {
    const currentArtist = await this.artistsRepository.findOneBy({id});
    if (!currentArtist) throw new NotFoundException(`User with ${id} not found`);
    return currentArtist;
  }

  public async updateArtist(id: string, artist: UpdateArtistDto) {
    const currentArtist = await this.artistsRepository.findOneBy({id});
    if (!currentArtist) throw new NotFoundException(`Artist with ${id} not found`);
    return await this.artistsRepository.save({...currentArtist, ...artist});
  }

  public async deleteArtist(id: string){
    const currentArtist = await this.artistsRepository.findOneBy({id});
    if (!currentArtist) throw new NotFoundException(`Artist with ${id} not found`);
    return await this.artistsRepository.remove(currentArtist);
  }
}