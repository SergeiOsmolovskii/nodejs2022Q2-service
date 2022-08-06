import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { ArtistService } from '../service/artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { HttpExceptionFilter } from '../../../logging/http-exception.filter';

@UseGuards(JwtAuthGuard)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  public async getArtists(): Promise<CreateArtistDto[]> {
    return this.artistService.getArtists();
  }

  @Post()
  @UseFilters(HttpExceptionFilter)
  async addArtist(@Body() artist: CreateArtistDto): Promise<CreateArtistDto> {
    return this.artistService.addArtist(artist);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  public async getArtisiById(@Param('id', new ParseUUIDPipe()) id: string): Promise<CreateArtistDto> {
    return this.artistService.getArtisiById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  public async updateArtist(@Param('id', new ParseUUIDPipe()) id: string, @Body() artist: UpdateArtistDto): Promise<CreateArtistDto> {
    return this.artistService.updateArtist(id, artist);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseFilters(HttpExceptionFilter)
  public async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {   
    return this.artistService.deleteArtist(id);
  }
}