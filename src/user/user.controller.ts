import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: UserDto) {
    const oldUser = await this.userService.findUser(dto.login);
    if (oldUser) {
      throw new BadRequestException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }
    return this.userService.createUser(dto);
  }
}
