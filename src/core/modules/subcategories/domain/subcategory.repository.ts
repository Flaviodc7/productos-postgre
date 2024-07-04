import { SubcategoryModel } from '@models/subcategories.model';
import { SubcategoryEntity } from './entities/subcategory.entity';

export interface SubcategoryRepository {
  create: (data: SubcategoryEntity) => Promise<SubcategoryModel>;
  findOneById(id: string): Promise<SubcategoryModel>;
  findByIds(ids: string[]): Promise<SubcategoryModel[]>;
  findAll(): Promise<SubcategoryModel[]>;
  update(id: string, data: any): Promise<SubcategoryModel>;
  delete(id: string): Promise<any>;
}
