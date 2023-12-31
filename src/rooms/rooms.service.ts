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
  create(data: CreateRoomDto) {
    return this.roomEntity.create(data);
  }

  findAll() {
    return this.roomEntity.find({});
  }

  findByNumber(number: string) {
    return this.roomEntity.findOne({ number });
  }

  findById(id: string) {
    return this.roomEntity.findById(id);
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomEntity.findOneAndUpdate({ _id: id }, updateRoomDto);
  }

  remove(_id: string) {
    return this.roomEntity.findByIdAndDelete({ _id });
  }

  agregateRooms(roomData: Room) {
    return this.roomEntity.aggregate([
      {
        $match: { number: roomData.number },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: 'schedules',
          localField: roomData.number,
          foreignField: 'productId',
          as: 'schedule',
        },
      },
    ]);
  }
}
