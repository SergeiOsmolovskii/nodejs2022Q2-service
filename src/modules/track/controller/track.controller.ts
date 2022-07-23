import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackService } from '../service/track.service';

@Controller('track')
export class TrackController {

  constructor(private readonly trackService: TrackService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getTracks(): Promise<CreateTrackDto[]> {
    return this.trackService.getTracks();
  }

  @Post()
  public async addTrack(@Body() track: CreateTrackDto): Promise<CreateTrackDto> {
    return this.trackService.addTrack(track);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getTrackById(@Param('id', new ParseUUIDPipe()) id: string): Promise<CreateTrackDto> {
    return this.trackService.getTrackById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateTrack(@Param('id', new ParseUUIDPipe()) id: string, @Body() track: CreateTrackDto): Promise<CreateTrackDto> {
    return this.trackService.updateTrack(id, track);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.trackService.deleteTrack(id);
  }
}
