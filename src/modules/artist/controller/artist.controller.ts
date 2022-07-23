import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ArtistService } from '../service/artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getArtists() {
    return this.artistService.getArtists();
  }

  @Post()
  async addArtist(@Body() artist: CreateArtistDto) {
    return this.artistService.addArtist(artist);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getArtisiById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.getArtisiById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateArtist(@Param('id', new ParseUUIDPipe()) id: string, @Body() artist: UpdateArtistDto) {
    return this.artistService.updateArtist(id, artist);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {   
    return this.artistService.deleteArtist(id);
  }
}