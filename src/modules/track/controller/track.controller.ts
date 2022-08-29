import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackService } from '../service/track.service';
import { AllExceptionFilter } from '../../../logging/allException.filter';

@UseGuards(JwtAuthGuard)
@Controller('track')
export class TrackController {

  constructor(private readonly trackService: TrackService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseFilters(AllExceptionFilter)
  public async getTracks(): Promise<CreateTrackDto[]> {
    return this.trackService.getTracks();
  }

  @Post()
  @UseFilters(AllExceptionFilter)
  public async addTrack(@Body() track: CreateTrackDto): Promise<CreateTrackDto> {
    return this.trackService.addTrack(track);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseFilters(AllExceptionFilter)
  public async getTrackById(@Param('id', new ParseUUIDPipe()) id: string): Promise<CreateTrackDto> {
    return this.trackService.getTrackById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseFilters(AllExceptionFilter)
  public async updateTrack(@Param('id', new ParseUUIDPipe()) id: string, @Body() track: CreateTrackDto): Promise<CreateTrackDto> {
    return this.trackService.updateTrack(id, track);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseFilters(AllExceptionFilter)
  public async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.trackService.deleteTrack(id);
  }
}
