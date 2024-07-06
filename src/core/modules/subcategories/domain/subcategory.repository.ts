import { SubcategoryEntity } from './entities/subcategory.entity';
import { SubcategoryModel } from '@models/subcategories.model';

export interface SubcategoryRepository {
  create: (data: SubcategoryEntity) => Promise<SubcategoryModel>;
  findOneById(id: string): Promise<SubcategoryModel>;
  findByIds(ids: string[]): Promise<SubcategoryModel[]>;
  findAll(): Promise<SubcategoryModel[]>;
  update(data: SubcategoryEntity): Promise<SubcategoryModel>;
  delete(id: string): Promise<any>;
}
