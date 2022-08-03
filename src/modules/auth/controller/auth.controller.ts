import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserService } from '../../user/service/user.service';
import { SigninUserDto } from '../dto/singin-user.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UserService) {}

  @Post('/login')
  signin(@Body() signinData: SigninUserDto): Promise<{accessToken: string}> {
    return this.authService.signin(signinData);
  }

  @Post('/signup')
  signup(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.createUser(body);
  }

}
