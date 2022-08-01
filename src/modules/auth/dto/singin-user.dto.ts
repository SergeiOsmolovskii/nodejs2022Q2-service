import { IsString, IsNotEmpty } from 'class-validator';

export class SigninUserDto {

  @IsString()
  @IsNotEmpty()
  readonly login!: string;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}