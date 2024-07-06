import { v4 as uuid } from 'uuid';
import { CreateCategoriesPayload } from '@categoriesApplication/categories.usecase.interface';
import { CategoryEntity } from './entities/category.entity';

export class CategoryValue {
  public create = (
    categoryPayload: CreateCategoriesPayload,
  ): CategoryEntity => {
    return {
      id: uuid(),
      ...categoryPayload,
    };
  };
}
