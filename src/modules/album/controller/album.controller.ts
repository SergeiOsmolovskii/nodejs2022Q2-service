import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { AlbumService } from '../service/album.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAlbums() {
    return this.albumService.getAlbums();
  }

  @Post()
  public async addAlbum(@Body() album: CreateAlbumDto) {  
    return this.albumService.addAlbum(album);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateAlbum(@Param('id', new ParseUUIDPipe()) id: string, @Body() album: UpdateAlbumDto) {
    return this.albumService.updateAlbum(id, album);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.deleteAlbum(id);
  }
}