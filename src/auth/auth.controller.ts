import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.servise';
import { UserDto } from 'src/user/dto/user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: UserDto) {
    const { login, password } = dto;
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email); 
  }
}
