import { Module } from '@nestjs/common';
import { FilesController } from '@controllers/files.controller';
import { FilesUseCase } from '@filesApplication/files.usecase';
import { FilesService } from '@services/files.service';

@Module({
  imports: [],
  controllers: [FilesController],
  providers: [FilesService, FilesUseCase],
})
export class FilesModule {}
