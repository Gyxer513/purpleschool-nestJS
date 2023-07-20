import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomEntity: Model<RoomDocument>,
  ) {}
  create(createRoomDto: CreateRoomDto) {
    return this.roomEntity.create(createRoomDto);
  }

  findAll() {
    return this.roomEntity.find({});
  }

  findByNumber(number: string) {
    return this.roomEntity.findOne({ number });
  }

  findById(id: string) {
    return this.roomEntity.findOne({ id });
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomEntity.updateOne({ id }, updateRoomDto);
  }

  remove(_id: string) {
    return this.roomEntity.findByIdAndDelete({ _id });
  }
}
