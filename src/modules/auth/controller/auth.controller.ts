import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserService } from '../../user/service/user.service';
import { SigninUserDto } from '../dto/singin-user.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { HttpExceptionFilter } from '../../../logging/http-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UserService) {}

  @Post('/login')
  @UseFilters(HttpExceptionFilter)
  signin(@Body() signinData: SigninUserDto): Promise<{accessToken: string}> {
    return this.authService.signin(signinData);
  }

  @Post('/signup')
  @UseFilters(HttpExceptionFilter)
  signup(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.createUser(body);
  }

  @Post('/refresh')
  @UseFilters(HttpExceptionFilter)
  refreshToken(@Body() token: {refreshToken: string}){
    return this.authService.refreshToken(token);
  }
}
