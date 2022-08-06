import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { AlbumService } from '../service/album.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { HttpExceptionFilter } from '../../../logging/http-exception.filter';

@UseGuards(JwtAuthGuard)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  public async getAlbums(): Promise<CreateAlbumDto[]> {
    return this.albumService.getAlbums();
  }

  @Post()
  @UseFilters(HttpExceptionFilter)
  public async addAlbum(@Body() album: CreateAlbumDto): Promise<CreateAlbumDto> {  
    return this.albumService.addAlbum(album);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  public async getAlbumById(@Param('id', new ParseUUIDPipe()) id: string): Promise<CreateAlbumDto> {
    return this.albumService.getAlbumById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  public async updateAlbum(@Param('id', new ParseUUIDPipe()) id: string, @Body() album: UpdateAlbumDto): Promise<CreateAlbumDto> {
    return this.albumService.updateAlbum(id, album);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseFilters(HttpExceptionFilter)
  public async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.albumService.deleteAlbum(id);
  }
}