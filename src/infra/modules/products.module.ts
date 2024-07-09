import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubcategoryUseCase } from '@subcategoriesApplication/subcategories.usecase';
import { ProductPostgreRepository } from '@repository/product.repository';
import { ProductUseCase } from '@productApplication/product.usecase';
import { ProductController } from '@controllers/product.controller';
import { ProductModel } from '@models/product.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  controllers: [ProductController],
  providers: [
    ProductPostgreRepository,
    SubcategoryUseCase,
    {
      provide: ProductUseCase,
      useFactory: (
        productRepo: ProductPostgreRepository,
        subcategoryUsecase: SubcategoryUseCase,
      ) => {
        return new ProductUseCase(productRepo, subcategoryUsecase);
      },
      inject: [ProductPostgreRepository, SubcategoryUseCase],
    },
  ],
  exports: [ProductPostgreRepository, TypeOrmModule, ProductUseCase],
})
export class ProductModule {}
