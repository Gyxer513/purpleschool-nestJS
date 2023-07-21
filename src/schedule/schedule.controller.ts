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
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { RoomsService } from 'src/rooms/rooms.service';


@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly roomsService: RoomsService,
  ) {}
  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    const { roomId, data } = createScheduleDto;
    const room = await this.roomsService.findById(roomId);
    if (room) {
      const schedule = await this.scheduleService.findByDay(data);
      if (schedule) {
        throw new HttpException(
          `На эту дату уже есть бронь`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.scheduleService.create(createScheduleDto);
      }
    } else {
       throw new HttpException(
        `Комната с id: ${roomId} не найдена`,
        HttpStatus.NOT_FOUND,
      ); 
    }
  }
  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
