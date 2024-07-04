import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryUseCase } from '../../core/modules/categories/application/category.usecase';
import { ProductUseCase } from '../../core/modules/products/application/product.usecase';
import { CategoryPostgreRepository } from '../repository/category.repository';
import { ProductPostgreRepository } from '../repository/product.repository';
import { CategoryController } from '../controllers/category.controller';
import { ProductController } from '../controllers/product.controller';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel, CategoryModel])],
  controllers: [ProductController, CategoryController],
  providers: [
    ProductPostgreRepository,
    {
      provide: ProductUseCase,
      useFactory: (productRepo: ProductPostgreRepository) => {
        return new ProductUseCase(productRepo);
      },
      inject: [ProductPostgreRepository],
    },
    {
      provide: CategoryUseCase,
      useFactory: (categoryRepo: CategoryPostgreRepository) => {
        return new CategoryUseCase(categoryRepo);
      },
      inject: [CategoryPostgreRepository],
    },
  ],
  exports: [ProductPostgreRepository, CategoryPostgreRepository, TypeOrmModule],
})
export class ProductModule {}
