import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesUseCase } from '@filesApplication/files.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesUseCase: FilesUseCase) {}

  @ApiOperation({ summary: 'Get all subcategories' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return await this.filesUseCase.upload(res, file);
  }
}
