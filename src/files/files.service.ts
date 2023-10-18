import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/response-element.dto';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';
import { CreateFileDto } from './dto/create-file.dto';
import { File, FileDocument } from './emtities/file.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name) private fileEntity: Model<FileDocument>,
  ) {}
  async saveFile(files: MFile[]): Promise<FileElementResponse[]> {
    const uploadFolder = `${path}`;
    await ensureDir(uploadFolder);
    const res: FileElementResponse[] = [];
    for (const file of files) {
      await writeFile(
        `${uploadFolder}/uploads/${file.originalname}`,
        file.buffer,
      );
      res.push({
        url: `/uploads/${file.originalname}`,
        name: file.originalname,
      });
    }
    return res;
  }

  convertToWepP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp({ lossless: true }).toBuffer();
  }

  create(query: CreateFileDto) {
    return this.fileEntity.create(query);
  }

  findFileByName(name: string) {
    return this.fileEntity.findOne({ name });
  }
}
