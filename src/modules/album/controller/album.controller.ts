import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { IAlbum } from '../album.interface';
import { AlbumService } from '../service/album.service';
import { checkUUID } from 'src/utils/checkUUID';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAlbums(): Promise<IAlbum[]> {
    return this.albumService.getAlbums();
  }

  @Post()
  public async addAlbum(@Body() album: CreateAlbumDto): Promise<IAlbum> {  
    return this.albumService.addAlbum(album);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getAlbumById(@Param('id') id: string): Promise<IAlbum> {

    if (!checkUUID(id)) throw new BadRequestException('Album ID is invalid');
    if (!(await this.albumService.getAlbumById(id))) throw new NotFoundException('Album with this ID not found');

    return this.albumService.getAlbumById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateAlbum(@Param('id') id: string, @Body() album: UpdateAlbumDto): Promise<IAlbum> {

     if (!checkUUID(id)) throw new BadRequestException('Album ID is invalid');
     if (!(await this.albumService.getAlbumById(id))) throw new NotFoundException('Album with this ID not found');

    return this.albumService.updateAlbum(id, album);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(@Param('id') id: string): Promise<void> {
      
      if (!checkUUID(id)) throw new BadRequestException('Album ID is invalid');
      if (!await this.albumService.getAlbumById(id)) throw new NotFoundException('Album with this ID not found');
  
      return this.albumService.deleteAlbum(id);
  }

}
