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
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';


@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
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


  @Get(':id')
  async findOne(@Param('id') _id: string) {
    return await this.roomsService.findById(_id);
  }

  @Get()
  async findOneByNumber(@Body() createRoomDto: CreateRoomDto) {
    const { number } = createRoomDto;
    return await this.roomsService.findByNumber(number);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removeRoom = await this.roomsService.findById(id);
    if (!removeRoom) {
      throw new HttpException(
        `Комнаты с таким ${id} не существует`,
        HttpStatus.BAD_REQUEST,
      );
    }
     return this.roomsService.remove(id); 
  }
}
