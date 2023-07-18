import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomEntity: Model<RoomDocument>
  ) {}
  create(createRoomDto: CreateRoomDto) {
    return this.roomEntity.create(createRoomDto);
  }

  findAll() {
    return `This action returns all rooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}