import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomsModule } from './rooms/rooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_LINK),
    ScheduleModule,
    RoomsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
