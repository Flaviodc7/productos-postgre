import { SubcategoryEntity } from './entities/subcategory.entity';

export interface SubcategoryRepository {
  create: (data: SubcategoryEntity) => Promise<SubcategoryEntity>;
  findOneById(id: string): Promise<SubcategoryEntity>;
  findByIds(ids: string[]): Promise<SubcategoryEntity[]>;
  findAll(): Promise<SubcategoryEntity[]>;
  update(data: SubcategoryEntity): Promise<SubcategoryEntity>;
  delete(id: string): Promise<any>;
}
