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
  Options,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/decorators/user-email.decorator';



@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService,
    private readonly userService: UserService) { }

  @UsePipes(new ValidationPipe())
  @Post()

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


/*   @Get(':id')
  async findOne(@Param('id') _id: string) {
    return await this.roomsService.findById(_id);
  } */

  @Get()
  async findOneByNumber(@Body() createRoomDto: CreateRoomDto) {
    const { number } = createRoomDto;
    const room = await this.roomsService.findByNumber(number);
    console.log(room)
    if (!room) {
      throw new HttpException(
        `Комната с  №${number} не найдена`,
        HttpStatus.NOT_FOUND,
      );
    }
    return room;
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto, @UserRole() email: string) {
    const role = (await this.userService.findUser(email)).role;
    if (role != 'ADMIN') {
      throw new HttpException(
        `только администарторы могут удалять комнааты`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.roomsService.update(id, updateRoomDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @UserRole() email: string) {
    const removeRoom = await this.roomsService.findById(id);
    const role = (await this.userService.findUser(email)).role;
    if (role != 'ADMIN') {
      throw new HttpException(
        `только администарторы могут удалять комнааты`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!removeRoom) {
      throw new HttpException(
        `Комнаты с таким ${id} не существует`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.roomsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stat')
  async showStatstic(@Body() dto: CreateRoomDto, @UserRole() email: string) {
    const role = (await this.userService.findUser(email)).role;
    if (role != 'ADMIN') {
      throw new HttpException(
        `это действие доступно только администратору`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.roomsService.agregateRooms(dto)
  }
}
