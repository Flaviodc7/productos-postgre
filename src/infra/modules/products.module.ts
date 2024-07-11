import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ProductPostgreRepository } from '@repository/product.repository';
import { ProductUseCase } from '@productApplication/product.usecase';
import { ProductController } from '@controllers/product.controller';
import { SubcategoryModule } from './subcategories.module';
import { ProductModel } from '@models/product.model';

@Module({
  imports: [
    forwardRef(() => SubcategoryModule),
    TypeOrmModule.forFeature([ProductModel]),
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: ProductPostgreRepository,
    },
    ProductUseCase,
  ],
  exports: [ProductUseCase, 'ProductRepository'],
})
export class ProductModule {}
