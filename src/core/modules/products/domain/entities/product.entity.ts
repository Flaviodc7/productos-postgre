import { SubcategoryEntity } from '@subcategoriesDomain/entities/subcategory.entity';

export interface ProductEntity {
  sku: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  photoUrl?: string;
  ean?: string;
  subcategories?: SubcategoryEntity[];
}
