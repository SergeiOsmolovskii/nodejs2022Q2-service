import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entity/album.entity';

@Injectable()
export class AlbumService {

  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumsRepository: Repository<AlbumEntity>,
  ) {}

  public async getAlbums() {
    return this.albumsRepository.find();
  }

  public async addAlbum(albumDto: CreateAlbumDto) {
    const newAlbum = this.albumsRepository.create(albumDto);
    return this.albumsRepository.save(newAlbum);
  }

  public async getAlbumById(id: string) {
    const currentAlbum = await this.albumsRepository.findOneBy({id});
    if (!currentAlbum) throw new NotFoundException(`Album with ${id} not found`);
    return currentAlbum;
  }

  public async updateAlbum(id: string, album: UpdateAlbumDto) {
    const currentAlbum = await this.albumsRepository.findOneBy({id});
    if (!currentAlbum) throw new NotFoundException(`Album with ${id} not found`);
    return await this.albumsRepository.save({...currentAlbum, ...album});
  }

  public async deleteAlbum(id: string) {
    const currentAlbum = await this.albumsRepository.findOneBy({id});
    if (!currentAlbum) throw new NotFoundException(`Album with ${id} not found`);
    return await this.albumsRepository.remove(currentAlbum);
  }

}

