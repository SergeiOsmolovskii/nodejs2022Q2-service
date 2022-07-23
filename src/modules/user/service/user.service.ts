import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.tdo';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
    // return allUsers.map(user => user.toResponse());
  }

  async createUser(userDto: CreateUserDto) {
    const savedUser = await this.usersRepository.save({
      // ...userDto,
      // createdAt: +new Date(),
      // updatedAt: +new Date(),
    });
    return {
      // id: savedUser.id,
      // login: savedUser.login,
      // version: savedUser.version,
      // createdAt: +savedUser.createdAt,
      // updatedAt: +savedUser.updatedAt,
    };
  }

  public async getUserById(id: string) {
    const user = await this.usersRepository.findOne( { where: { id: id } } );
    
    if (!user) {
      throw new ForbiddenException(`User with ${id} not found`);
    }
    
    return user;
   
    // const currentData = {
    //   login: user.login,
    //   id: user.id,
    //   createdAt: user.createdAt,
    //   version: user.version,
    //   updatedAt: user.updatedAt
    // };    

    // return currentData;
  }

  // public async updateUser(id: string, passwords: UpdatePasswordDto): Promise<IUser> {
  //   const index = this.inMemoryDB.users.findIndex(user => user.id === id);
  //   const currentUser = this.inMemoryDB.users[index];

  //   if (currentUser.password !== passwords.oldPassword) {
  //     throw new ForbiddenException('Old password is incorrect');
  //   }

  //   const updatedUser = {
  //     login: currentUser.login,
  //     createdAt: currentUser.createdAt,
  //     id,
  //     version: currentUser.version + 1,
  //     updatedAt: +Date.now()
  //   };

  //   this.inMemoryDB.users[index] = {
  //     ...updatedUser,
  //     password: passwords.newPassword
  //   };
    
  //   return updatedUser;
  // }

  public async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

}
