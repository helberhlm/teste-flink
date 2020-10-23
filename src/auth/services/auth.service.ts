import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../user/repositories/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { User } from '../../user/entities/user.entity';
import { CredentialsDto } from '../dtos/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDto } from '../dtos/return-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.createUser(createUserDto);
    return user;
  }

  async login(credentialsDto: CredentialsDto): Promise<ReturnLoginDto> {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Login inválido');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    user.password = user.salt = undefined;
    return { token, user };
  }
}
