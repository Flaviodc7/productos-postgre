import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { SubcategoryUseCase } from '@subcategoriesApplication/subcategories.usecase';
import { SubcategoryPostgreRepository } from '@repository/subcategories.repository';
import { SubcategoryController } from '@controllers/subcategories.controller';
import { SubcategoryModel } from '@models/subcategories.model';
import { CategoryModule } from './categories.module';
import { ProductModule } from './products.module';

@Module({
  imports: [
    forwardRef(() => ProductModule),
    TypeOrmModule.forFeature([SubcategoryModel]),
    CategoryModule,
  ],
  controllers: [SubcategoryController],
  providers: [
    {
      provide: 'SubcategoryRepository',
      useClass: SubcategoryPostgreRepository,
    },
    SubcategoryUseCase,
  ],
  exports: [SubcategoryUseCase, 'SubcategoryRepository'],
})
export class SubcategoryModule {}
