import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserService } from '../../user/service/user.service';
import { SigninUserDto } from '../dto/singin-user.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UserService) {}

  @Post('/signin')
  signin(@Body() signinData: SigninUserDto): Promise<{token: string}> {
    return this.authService.signin(signinData);
  }

  @Post('/login')
  signup(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.createUser(body);
  }

}
