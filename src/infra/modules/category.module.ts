import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryUseCase } from '../../core/modules/categories/application/category.usecase';
import { CategoryPostgreRepository } from '../repository/category.repository';
import { CategoryController } from '../controllers/category.controller';
import { CategoryModel } from '../models/category.model';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryModel])],
  controllers: [CategoryController],
  providers: [
    CategoryPostgreRepository,
    {
      provide: CategoryUseCase,
      useFactory: (categoryRepo: CategoryPostgreRepository) => {
        return new CategoryUseCase(categoryRepo);
      },
      inject: [CategoryPostgreRepository],
    },
  ],
  exports: [CategoryPostgreRepository, TypeOrmModule],
})
export class CategoryModule {}
