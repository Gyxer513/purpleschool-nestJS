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
  ParseIntPipe,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { RoomsService } from '../rooms/rooms.service';


@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly roomsService: RoomsService,
  ) {}
  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    const { roomId, date } = createScheduleDto;
    const room = await this.roomsService.findById(roomId);
    if (room) {
      return this.scheduleService.create(createScheduleDto);
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
  findOne(@Param('id', ParseIntPipe) id) {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
