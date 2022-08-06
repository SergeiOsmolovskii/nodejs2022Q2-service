import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards, UseFilters } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.tdo';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { HttpExceptionFilter } from '../../../logging/http-exception.filter';


@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService ) {}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  public async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseFilters(HttpExceptionFilter)
  public async createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  public async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseFilters(HttpExceptionFilter)
  public async updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() newPassword: UpdatePasswordDto) {  
    return this.userService.updateUser(id, newPassword);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseFilters(HttpExceptionFilter)
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}