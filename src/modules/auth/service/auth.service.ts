import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserEntity } from '../../user/entity/user.entity';
import { SigninUserDto } from '../dto/singin-user.dto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async signin(body: SigninUserDto): Promise<{token: string}> {    
    const user = await this.usersRepository.findOne({ select: ['id', 'password'], where: { login: body.login } });
    
    if (!user) {
      throw new HttpException('User was not founded!', HttpStatus.FORBIDDEN);
    }

    if (!(body.password === user.password)) {
      throw new HttpException('User was not founded!', HttpStatus.FORBIDDEN);
    }

/* TO FIX */
    
    const token = jwt.sign({ id: user.id, login: body.login }, process.env.JWT_SECRET_KEY as string);
    
    return { token };
  }
}