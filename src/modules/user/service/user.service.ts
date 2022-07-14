import { ForbiddenException, Injectable } from '@nestjs/common';
import { IUser } from '../user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UpdatePasswordDto } from '../dto/update-password.tdo';

@Injectable()
export class UserService {
  private readonly users: IUser[] = [];

  public async getAllUsers(): Promise<IUser[]> {
    return this.users;
  }

  public async createUser(user: CreateUserDto): Promise<IUser> {
    const createdAt = +Date.now();
    const updatedAt = +Date.now();
    const version = 1;
    const newUser = {
      login: user.login,
      id: uuid(),
      createdAt: createdAt,
      version: version,
      updatedAt: updatedAt,
    };

    this.users.push({...newUser, password: user.password});
    return newUser;
  }

  public async getUserById(id: string): Promise<IUser> {

    const user = this.users.find(user => user.id === id);
   
    const currentData = {
      login: user.login,
      id: user.id,
      createdAt: user.createdAt,
      version: user.version,
      updatedAt: user.updatedAt
    };    

    return currentData;
  }

  public async updateUser(id: string, passwords: UpdatePasswordDto): Promise<IUser> {
    const index = this.users.findIndex(user => user.id === id);
    const currentUser = this.users[index];

    if (currentUser.password !== passwords.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = {
      login: currentUser.login,
      createdAt: currentUser.createdAt,
      id,
      version: currentUser.version + 1,
      updatedAt: +Date.now()
    };

    this.users[index] = {
      ...updatedUser,
      password: passwords.newPassword
    };
    
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<IUser> {
    const index = this.users.findIndex(user => user.id === id);
    const user = this.users[index];
    this.users.splice(index, 1);
    return user;
  }

}
