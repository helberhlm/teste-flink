import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { CredentialsDto } from '../dtos/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/entities/user.entity';
import { ReturnLoginDto } from '../dtos/return-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.authService.register(createUserDto);
    return {
      message: 'Usuário criado com sucesso',
    };
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
  ): Promise<ReturnLoginDto> {
    return await this.authService.login(credentiaslsDto);
  }

  @Get('/profile')
  @UseGuards(AuthGuard())
  profile(@Req() req): User {
    return req.user;
  }
}
