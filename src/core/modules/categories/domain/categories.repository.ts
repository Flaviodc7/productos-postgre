import { CategoryModel } from '@models/categories.model';
import { CategoryEntity } from './entities/category.entity';

export interface CategoryRepository {
  create: (data: CategoryEntity) => Promise<CategoryModel>;
  findOneById(id: string): Promise<CategoryModel>;
  findByIds(ids: string[]): Promise<CategoryModel[]>;
  findAll(): Promise<CategoryModel[]>;
  update(id: string, data: any): Promise<CategoryModel>;
  delete(id: string): Promise<any>;
}
