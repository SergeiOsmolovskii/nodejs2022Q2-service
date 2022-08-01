import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AlbumService } from '../service/album.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAlbums(): Promise<CreateAlbumDto[]> {
    return this.albumService.getAlbums();
  }

  @Post()
  public async addAlbum(@Body() album: CreateAlbumDto): Promise<CreateAlbumDto> {  
    return this.albumService.addAlbum(album);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getAlbumById(@Param('id', new ParseUUIDPipe()) id: string): Promise<CreateAlbumDto> {
    return this.albumService.getAlbumById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateAlbum(@Param('id', new ParseUUIDPipe()) id: string, @Body() album: UpdateAlbumDto): Promise<CreateAlbumDto> {
    return this.albumService.updateAlbum(id, album);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}