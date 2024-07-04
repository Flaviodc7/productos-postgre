import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubcategoryUseCase } from '@subcategoriesApplication/subcategories.usecase';
import { SubcategoryPostgreRepository } from '@repository/subcategories.repository';
import { SubcategoryController } from '@controllers/subcategories.controller';
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
export class SubcategoryModule {}
