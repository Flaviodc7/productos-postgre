import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubcategoryPostgreRepository } from '../repository/subcategories.repository';
import { SubcategoryUseCase } from '@subcategoriesApplication/subcategories.usecase';
import { SubcategoryController } from '@controllers/categories.controller';
import { SubcategoryModel } from '@models/subcategories.model';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoryModel])],
  controllers: [SubcategoryController],
  providers: [
    SubcategoryPostgreRepository,
    {
      provide: SubcategoryUseCase,
      useFactory: (subcategoryRepo: SubcategoryPostgreRepository) => {
        return new SubcategoryUseCase(subcategoryRepo);
      },
      inject: [SubcategoryPostgreRepository],
    },
  ],
  exports: [SubcategoryPostgreRepository, TypeOrmModule],
})
export class CategoryModule {}
