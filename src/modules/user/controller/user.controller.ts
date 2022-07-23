import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
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
  public async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getUserById(@Param('id') id: string): Promise<UserEntity> {

    const users = await this.userService.getAllUsers();
    const usersIDs = users.map(user => user.id);

    if (!checkUUID(id)) throw new BadRequestException('User ID is invalid');
    if (usersIDs.findIndex(userId => userId === id)) throw new NotFoundException('User with this ID not found');

    return this.userService.getUserById(id);
  }

  // @Put('/:id')
  // @HttpCode(HttpStatus.OK)
  // public async updateUser(@Param('id') id: string, @Body() newPassword: UpdatePasswordDto): Promise<IUser> {
        
  //   const users = await this.userService.getAllUsers();
  //   const usersIDs = users.map(user => user.id);

  //     if (!checkUUID(id)) throw new BadRequestException('User ID is invalid');
  //     if (usersIDs.findIndex(userId => userId === id)) throw new NotFoundException('User with this ID not found');
      
  //     return this.userService.updateUser(id, newPassword);
  // }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(@Param('id') id: string): Promise<void> {
    
    const users = await this.userService.getAllUsers();
    const usersIDs = users.map(user => user.id);
    
      if (!checkUUID(id)) throw new BadRequestException('User ID is invalid');
      if (usersIDs.findIndex(userId => userId === id)) throw new NotFoundException('User with this ID not found');

      return this.userService.deleteUser(id);
    }

}
