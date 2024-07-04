import { v4 as uuid } from 'uuid';
import { CategoriesCreatePayload } from '@categoriesApplication/categories.usecase.interface';
import { CategoryEntity } from './entities/category.entity';

export class CategoryValue {
  public create = (
    categoryPayload: CategoriesCreatePayload,
  ): CategoryEntity => {
    return {
      id: uuid(),
      ...categoryPayload,
    };
  };
}
