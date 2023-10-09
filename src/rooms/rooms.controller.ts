import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from 'src/user/user.service';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { Role } from 'src/user/entities/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';



@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService,
    private readonly userService: UserService) { }

  @UsePipes(new ValidationPipe())
  @Post()
  @UseGuards()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createRoomDto: CreateRoomDto) {
    const { number } = createRoomDto;
    const room = await this.roomsService.findByNumber(number);
    if (!room) {
      return this.roomsService.create(createRoomDto);
    } else {
      throw new HttpException(
        `Комната с № ${number} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findOneByNumber(@Body() createRoomDto: CreateRoomDto) {
    const { number } = createRoomDto;
    const room = await this.roomsService.findByNumber(number);
    if (!room) {
      throw new HttpException(
        `Комната с  №${number} не найдена`,
        HttpStatus.NOT_FOUND,
      );
    }
    return room;
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto, @UserEmail() email: string) {
    const role = (await this.userService.findUser(email)).role;
    if (role !== Role.ADMIN) {
      throw new HttpException(
        `только администарторы могут удалять комнааты`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.roomsService.update(id, updateRoomDto);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @UserEmail() email: string) {
    const removeRoom = await this.roomsService.findById(id);
    if (!removeRoom) {
      throw new HttpException(
        `Комнаты с таким ${id} не существует`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.roomsService.remove(id);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('stat')
  async showStatstic(@Body() dto: CreateRoomDto, @UserEmail() email: string) {
    return this.roomsService.agregateRooms(dto)
  }
}
