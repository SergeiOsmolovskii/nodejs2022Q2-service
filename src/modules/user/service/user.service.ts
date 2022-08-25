import { ForbiddenException, Injectable } from '@nestjs/common';
import { IUser } from '../user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UpdatePasswordDto } from '../dto/update-password.tdo';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class UserService {

  constructor(private readonly inMemoryDB: InMemoryDbService) {}

  public async getAllUsers(): Promise<IUser[]> {
    return this.inMemoryDB.users;
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

    this.inMemoryDB.users.push({...newUser, password: user.password});
    return newUser;
  }

  public async getUserById(id: string): Promise<IUser> {

    const user = this.inMemoryDB.users.find(user => user.id === id);
   
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
    const index = this.inMemoryDB.users.findIndex(user => user.id === id);
    const currentUser = this.inMemoryDB.users[index];

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

    this.inMemoryDB.users[index] = {
      ...updatedUser,
      password: passwords.newPassword
    };
    
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<IUser> {
    const index = this.inMemoryDB.users.findIndex(user => user.id === id);
    const user = this.inMemoryDB.users[index];
    this.inMemoryDB.users.splice(index, 1);
    return user;
  }

}
