import { CategoryEntity } from "@categoriesDomain/entities/category.entity";
import { ProductEntity } from "@productDomain/entities/product.entity";

export interface SubcategoryEntity {
  id: string;
  name: string;
  description?: string;
  category: CategoryEntity;
  products?: ProductEntity[];
}
