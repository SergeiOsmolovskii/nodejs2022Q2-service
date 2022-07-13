import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAlbumDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @Optional()
  artistId: string | null;
}