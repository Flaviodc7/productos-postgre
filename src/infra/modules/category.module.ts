import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryPostgreRepository } from '../repository/category.repository';
import { CategoryUseCase } from '@categoryApplication/category.usecase';
import { CategoryController } from '@controllers/categories.controller';
import { CategoryModel } from '@models/categories.model';

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
