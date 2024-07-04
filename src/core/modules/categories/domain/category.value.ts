import { v4 as uuid } from 'uuid';
import { CategoryCreatePayload } from '@categoryApplication/category.usecase.interface';
import { CategoryEntity } from './entities/category.entity';

export class CategoryValue {
  public create = (categoryPayload: CategoryCreatePayload): CategoryEntity => {
    return {
      id: uuid(),
      ...categoryPayload,
    };
  };
}
