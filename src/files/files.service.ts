import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/response-element.dto';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
  async saveFile(files: Express.Multer.File[]): Promise<FileElementResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}`;
    await ensureDir(uploadFolder);
    const res: FileElementResponse[] = [];
    for (const file of files) {
      await writeFile(`${uploadFolder}/uploads/${file.originalname}`, file.buffer);
      res.push({
        url: `uploads/${file.originalname}`,
        name: file.originalname,
      });
    }
    return res;
  }
}
