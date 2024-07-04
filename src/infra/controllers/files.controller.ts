import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesUseCase } from '@src/core/modules/files/application/files.usecase';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesUseCase: FilesUseCase) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return await this.filesUseCase.upload(res, file);
  }
}
