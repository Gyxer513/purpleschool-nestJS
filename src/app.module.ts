import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { RoomsModule } from './rooms/rooms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb://localhost:27017/purpleschool',
    ),
    ScheduleModule,
    RoomsModule,
    AuthModule,
    UserModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/static'
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
