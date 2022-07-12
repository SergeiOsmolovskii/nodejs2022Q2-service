import { IsNotEmpty, IsString } from "class-validator";

export class UpdateArtistDto {
  
  @IsString()
  @IsNotEmpty()
  name: String;

  @IsString() 
  @IsNotEmpty()
  grammy: boolean;
}