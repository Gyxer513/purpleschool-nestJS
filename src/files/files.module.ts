import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { UserModule } from 'src/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './emtities/file.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/static'
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
