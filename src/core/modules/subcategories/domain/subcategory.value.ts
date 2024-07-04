import { v4 as uuid } from 'uuid';
import { SubcategoriesCreatePayload } from '@subcategoriesApplication/subcategories.usecase.interface';
import { SubcategoryEntity } from './entities/subcategory.entity';

export class SubcategoryValue {
  public create = (
    categoryPayload: SubcategoriesCreatePayload,
  ): SubcategoryEntity => {
    return {
      id: uuid(),
      ...categoryPayload,
    };
  };
}
