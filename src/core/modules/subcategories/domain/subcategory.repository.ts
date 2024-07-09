import { SubcategoryEntity } from './entities/subcategory.entity';
import { SubcategoryModel } from '@models/subcategories.model';

export interface SubcategoryRepository {
  create: (payload: SubcategoryModel) => Promise<SubcategoryModel>;
  findOneById(id: string): Promise<SubcategoryModel>;
  findByIds(ids: string[]): Promise<SubcategoryModel[]>;
  findAll(): Promise<SubcategoryModel[]>;
  update(
    updatedSubcategory: SubcategoryModel,
    payload: SubcategoryEntity,
  ): Promise<SubcategoryModel>;
  delete(id: string): Promise<any>;
}
