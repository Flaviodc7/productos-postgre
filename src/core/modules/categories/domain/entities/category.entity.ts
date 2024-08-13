import { SubcategoryEntity } from '@subcategoriesDomain/entities/subcategory.entity';

export interface CategoryEntity {
  id: string;
  name: string;
  description?: string;
  subcategories?: SubcategoryEntity[];
}
