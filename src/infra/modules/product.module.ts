import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductPostgreRepository } from '../repository/product.repository';
import { ProductController } from '@controllers/product.controller';
import { ProductUseCase } from '@productApplication/product.usecase';
import { ProductModel } from '@models/product.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductUseCase,
      useFactory: (productRepo: ProductPostgreRepository) => {
        return new ProductUseCase(productRepo);
      },
      inject: [ProductPostgreRepository],
    },
  ],
  exports: [ProductPostgreRepository, TypeOrmModule],
})
export class ProductModule {}
