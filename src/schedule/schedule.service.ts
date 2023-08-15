import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule, ScheduleDocument } from './entities/schedule.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleEntity: Model<ScheduleDocument>,
  ) {}
  create(data: CreateScheduleDto) {
    return this.scheduleEntity.create(data);
  }

  findByDay(data: string) {
    return this.scheduleEntity.findOne({ data });
  }


  remove(_id: string) {
    return this.scheduleEntity.findByIdAndDelete({ _id });
  }

}
