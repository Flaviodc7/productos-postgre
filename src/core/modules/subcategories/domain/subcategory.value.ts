import { v4 as uuid } from 'uuid';
import {
  CreateSubcategoriesPayload,
  UpdateSubcategoriesPayload,
} from '@subcategoriesApplication/subcategories.usecase.interface';
import { CategoryEntity } from '@categoriesDomain/entities/category.entity';
import { ProductEntity } from '@productDomain/entities/product.entity';
import { SubcategoryEntity } from './entities/subcategory.entity';

export class SubcategoryValue {
  public create = (
    subcategoryPayload: CreateSubcategoriesPayload,
    category: CategoryEntity,
    products: ProductEntity[],
  ): SubcategoryEntity => {
    const { categoryId, productIds, ...restPayload } = subcategoryPayload;
    return {
      id: uuid(),
      category,
      products,
      ...restPayload,
    };
  };

  public update = (
    subcategoryPayload: UpdateSubcategoriesPayload,
    category: CategoryEntity,
    products: ProductEntity[],
  ): SubcategoryEntity => {
    const { categoryId, productIds, ...restPayload } = subcategoryPayload;
    return {
      category,
      products,
      ...restPayload,
    };
  };
}
