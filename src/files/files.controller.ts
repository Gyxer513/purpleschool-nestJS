import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { FileElementResponse } from './dto/response-element.dto';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload')
  @HttpCode(200)
  @UseGuards(RolesGuard, JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadedFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    const saveArray: MFile[] = [new MFile(file)];
    const buffer = await this.filesService.convertToWepP(file.buffer);
    saveArray.push(
      new MFile({
        originalname: `${file.originalname.split('.')[0]}.webp`,
        buffer,
      }),
    );
    /* this.filesService.create(saveArray) */
    const res = await this.filesService.saveFile(saveArray);
    const {url, name} = res[1];
    await this.filesService.create({
      name: name,
      url: url
    })
    return res;
  }
}
