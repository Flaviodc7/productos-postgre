import { CategoryCreatePayload } from '../application/category.usecase.interface';
import { v4 as uuid } from 'uuid';
import { CategoryEntity } from './entities/category.entity';

export class CategoryValue {
  public create = (categoryPayload: CategoryCreatePayload): CategoryEntity => {
    return {
      id: uuid(),
      ...categoryPayload,
    };
  };
}
