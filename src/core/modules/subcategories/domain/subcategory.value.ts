import { v4 as uuid } from 'uuid';
import { CreateSubcategoriesPayload } from '@subcategoriesApplication/subcategories.usecase.interface';
import { SubcategoryEntity } from './entities/subcategory.entity';

export class SubcategoryValue {
  public create = (
    subcategoryPayload: CreateSubcategoriesPayload,
  ): SubcategoryEntity => {
    return {
      id: uuid(),
      ...subcategoryPayload,
    };
  };
}
