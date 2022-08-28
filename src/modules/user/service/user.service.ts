import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.tdo';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async getAllUsers() {
    return (await this.usersRepository.find()).map(user => user.toResponse());
  }

  async createUser(userDto: CreateUserDto) {
    const createdUser = this.usersRepository.create(userDto);
    return (await this.usersRepository.save(createdUser)).toResponse();
  }

  public async getUserById(id: string) {
    const currentUser = await this.usersRepository.findOneBy({id});
    if (!currentUser) throw new NotFoundException(`User with ${id} not found`);
    return currentUser.toResponse();
  }

  public async updateUser(id: string, passwords: UpdatePasswordDto) {
    const currentUser = await this.usersRepository.findOneBy({id});
    if (!currentUser) throw new NotFoundException(`User with ${id} not found`);
    if (currentUser.password !== passwords.oldPassword) throw new ForbiddenException('Old password is incorrect');
    currentUser.password = passwords.newPassword;
    return (await this.usersRepository.save(currentUser)).toResponse();
  }

  public async deleteUser(id: string): Promise<void> {
    const currentUser = await this.usersRepository.findOneBy({id});
    if (!currentUser) throw new NotFoundException(`User with ${id} not found`);
    await this.usersRepository.delete(id);
  }
}