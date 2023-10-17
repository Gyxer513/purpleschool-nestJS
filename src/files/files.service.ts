import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/response-element.dto';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
  async saveFile(files: MFile[]): Promise<FileElementResponse[]> {
    const uploadFolder = `${path}`;
    await ensureDir(uploadFolder);
    const res: FileElementResponse[] = [];
    for (const file of files) {
      await writeFile(`${uploadFolder}/uploads/${file.originalname}`, file.buffer);
      res.push({
        url: `/uploads/${file.originalname}`,
        name: file.originalname,
      });
    }
    return res;
  }

  convertToWepP(file: Buffer): Promise<Buffer> {
    return sharp(file)
    .webp({ lossless: true })
    .toBuffer();
  }
}
