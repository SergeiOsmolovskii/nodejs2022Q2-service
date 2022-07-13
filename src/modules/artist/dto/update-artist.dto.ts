import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateArtistDto {
  
  @IsString()
  @IsNotEmpty()
  name: String;

  @IsBoolean() 
  @IsNotEmpty()
  grammy: boolean;
}