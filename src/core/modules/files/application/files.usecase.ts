import { ConfigType } from '@nestjs/config';
import * as sharp from 'sharp';
import { IFilesUseCase } from './files.usecase.interface';
import { FilesService } from '@services/files.service';
import config from '@src/config';
import { HttpStatus } from '@nestjs/common';

export class FilesUseCase implements IFilesUseCase {
  constructor(
    private readonly filesService: FilesService,
    private configService: ConfigType<typeof config>,
  ) {}

  async upload(res: any, file: Express.Multer.File): Promise<any> {
    const { bucketName } = this.configService.awsCredentials;

    const optimizedFile = await sharp(file.buffer)
      .toFormat('webp', { quality: 80 })
      .toBuffer();

    const response = await this.filesService.uploadPublicFile(
      optimizedFile,
      file.originalname,
      bucketName,
    );

    return res.status(HttpStatus.CREATED).json({
      data: response,
      message: 'Image successfully uploaded',
    });
  }
}
