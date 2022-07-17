import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ArtistService } from '../service/artist.service';
import { IArtist } from '../artist.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { checkUUID } from 'src/utils/checkUUID';


@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getArtists(): Promise<IArtist[]> {
    return this.artistService.getArtists();
  }

  @Post()
  async addArtist(@Body() artist: CreateArtistDto): Promise<IArtist> {
    return this.artistService.addArtist(artist);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getArtisiById(@Param('id') id: string) {
    
    if (!checkUUID(id)) throw new BadRequestException('Artist ID is invalid');
    if (!(await this.artistService.getArtisiById(id))) throw new NotFoundException('Artist with this ID not found');

    return this.artistService.getArtisiById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateArtist(@Param('id') id: string, @Body() artist: UpdateArtistDto): Promise<IArtist> {

    if (!checkUUID(id)) throw new BadRequestException('Artist ID is invalid');
    if (!(await this.artistService.getArtisiById(id))) throw new NotFoundException('Artist with this ID not found');

    return this.artistService.updateArtist(id, artist);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteArtist(@Param('id') id: string): Promise<void> {

    if (!checkUUID(id)) throw new BadRequestException('Artist ID is invalid');
    if (!(await this.artistService.getArtisiById(id))) throw new NotFoundException('Artist with this ID not found');
    
    return this.artistService.deleteArtist(id);
  }

}
