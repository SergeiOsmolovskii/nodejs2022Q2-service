import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { checkUUID } from 'src/utils/checkUUID';
import { UpdatePasswordDto } from '../dto/update-password.tdo';
import { UserEntity } from '../entity/user.entity';

@Controller('user')
export class UserController {

  constructor(private userService: UserService ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async updateUser(@Param('id', new ParseUUIDPipe()) id: string, @Body() newPassword: UpdatePasswordDto) {  
    return this.userService.updateUser(id, newPassword);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

}
