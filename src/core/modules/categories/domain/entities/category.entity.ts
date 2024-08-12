import { SubcategoryEntity } from "@src/core/modules/subcategories/domain/entities/subcategory.entity";

export interface CategoryEntity {
  id: string;
  name: string;
  description?: string;
  subcategories?: SubcategoryEntity[]
}
