import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesUseCase } from '@filesApplication/files.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i;
const maxSizeImage = 1000 * 1024 * 5;

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesUseCase: FilesUseCase) {}

  @ApiOperation({ summary: 'Upload a single image to S3' })
  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Res() res: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: imageRegex,
        })
        .addMaxSizeValidator({
          maxSize: maxSizeImage,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    return await this.filesUseCase.upload(res, file);
  }
}
