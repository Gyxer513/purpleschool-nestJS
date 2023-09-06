import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.model';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtSevice: JwtService,
    private readonly userService: UserService, 
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUser(email);
    if (!user) {
      throw new UnauthorizedException('Такого пользователя не существует');
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtSevice.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }
}
