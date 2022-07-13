import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateAlbumDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @Optional()
  artistId: string | null;
}