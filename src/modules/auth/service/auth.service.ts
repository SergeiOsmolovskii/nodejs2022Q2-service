import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../user/entity/user.entity';
import { SigninUserDto } from '../dto/singin-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  public async signin(body: SigninUserDto): Promise<{accessToken: string}> {    
    const user = await this.usersRepository.findOne({ select: ['id', 'password'], where: { login: body.login } });
 
    if (!user) {
      throw new HttpException('User was not founded!', HttpStatus.FORBIDDEN);
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
      throw new HttpException('User was not founded!', HttpStatus.FORBIDDEN);
    }
   
    const accessToken = this.jwtService.sign({ id: user.id, login: body.login }, { expiresIn: process.env.TOKEN_EXPIRE_TIME });
    const refreshtoken = this.jwtService.sign({ id: user.id, login: body.login }, { expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME });
    
    return { accessToken };
  }
  
}