import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomsModule } from './rooms/rooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_LINK),
    ScheduleModule,
    RoomsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [{provide: APP_GUARD, useClass: RolesGuard}],
})
export class AppModule { }
