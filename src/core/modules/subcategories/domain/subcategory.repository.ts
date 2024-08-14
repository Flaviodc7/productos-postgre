import { SubcategoryEntity } from './entities/subcategory.entity';

export interface SubcategoryRepository {
  create: (payload: SubcategoryEntity) => Promise<SubcategoryEntity>;
  findOneById(id: string): Promise<SubcategoryEntity>;
  findByIds(ids: string[]): Promise<SubcategoryEntity[]>;
  findAll(): Promise<SubcategoryEntity[]>;
  update(updatedSubcategory: SubcategoryEntity): Promise<SubcategoryEntity>;
  delete(id: string): Promise<any>;
}
