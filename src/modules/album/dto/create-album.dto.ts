import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAlbumDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  artistId: string | null;
}