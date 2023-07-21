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
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

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

  @Get()
  async findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') _id: string) {
    return await this.roomsService.findById(_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Patch(':id')
  async handleIsReservedStatus(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    const room = await this.roomsService.findById(id);
    if (room.reserved) {
      return this.roomsService.update(id, {reserved: false});
    } else {
      return this.roomsService.update(id, {reserved: true});
    }
    
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removeRoom = await this.roomsService.findById(id);
    if (!removeRoom) {
      /* throw new HttpException(
        `Комнаты с таким ${_id} не существует`,
        HttpStatus.BAD_REQUEST,
      ); */
      return removeRoom;
    }
    /* return this.roomsService.remove(_id); */

  }
}
