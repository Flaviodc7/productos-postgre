import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubcategoryUseCase } from '@subcategoriesApplication/subcategories.usecase';
import { SubcategoryPostgreRepository } from '@repository/subcategories.repository';
import { SubcategoryController } from '@controllers/subcategories.controller';
import { CategoryUseCase } from '@categoriesApplication/categories.usecase';
import { ProductUseCase } from '@productApplication/product.usecase';
import { SubcategoryModel } from '@models/subcategories.model';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoryModel])],
  controllers: [SubcategoryController],
  providers: [
    SubcategoryPostgreRepository,
    CategoryUseCase,
    ProductUseCase,
    {
      provide: SubcategoryUseCase,
      useFactory: (
        subcategoryRepo: SubcategoryPostgreRepository,
        categoryUsecase: CategoryUseCase,
        productUsecase: ProductUseCase,
      ) => {
        return new SubcategoryUseCase(
          subcategoryRepo,
          categoryUsecase,
          productUsecase,
        );
      },
      inject: [SubcategoryPostgreRepository, CategoryUseCase, ProductUseCase],
    },
  ],
  exports: [SubcategoryPostgreRepository, TypeOrmModule],
})
export class SubcategoryModule {}
