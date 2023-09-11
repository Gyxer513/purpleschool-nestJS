import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { RoomsService } from '../rooms/rooms.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { UserService } from 'src/user/user.service';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly roomsService: RoomsService,
    private readonly userService: UserService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    const { roomId } = createScheduleDto;
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

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removeRoom = await this.scheduleService.remove(id);
    if (!removeRoom) {
      throw new HttpException(
        `Комнаты с таким ${id} не существует`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.scheduleService.remove(id);
  }
}
