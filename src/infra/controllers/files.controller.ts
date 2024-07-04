import {
  Controller,
  Post,
  Res,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigType } from '@nestjs/config';
import * as sharp from 'sharp';
import { FilesService } from '../services/files.service';
import config from '../../config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private configService: ConfigType<typeof config>,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const { bucketName } = this.configService.awsCredentials;

    const optimizedFile = await sharp(file.buffer)
    .toFormat('webp', {quality: 80})
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
