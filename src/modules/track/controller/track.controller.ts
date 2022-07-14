import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { checkUUID } from 'src/utils/checkUUID';
import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackService } from '../service/track.service';
import { ITrack } from '../track.interface';

@Controller('track')
export class TrackController {

  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getTracks(): Promise<ITrack[]> {
    return this.trackService.getTracks();
  }

  @Post()
  public async addTrack(@Body() track: CreateTrackDto ): Promise<ITrack> {
    return this.trackService.addTrack(track);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getTrackById(@Param('id') id: string): Promise<ITrack> {
    
    if (!checkUUID(id)) throw new BadRequestException('Track ID is invalid');
    if (!(await this.trackService.getTrackById(id))) throw new NotFoundException('Track with this ID not found');

    return this.trackService.getTrackById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateTrack(@Param('id') id: string, @Body() track: CreateTrackDto): Promise<ITrack> {

    if (!checkUUID(id)) throw new BadRequestException('Track ID is invalid');
    if (!(await this.trackService.getTrackById(id))) throw new NotFoundException('Track with this ID not found');

    return this.trackService.updateTrack(id, track);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTrack(@Param('id') id: string): Promise<ITrack> {
      
      if (!checkUUID(id)) throw new BadRequestException('Track ID is invalid');
      if (!await this.trackService.getTrackById(id)) throw new NotFoundException('Track with this ID not found');
  
      return this.trackService.deleteTrack(id);
    }
}
