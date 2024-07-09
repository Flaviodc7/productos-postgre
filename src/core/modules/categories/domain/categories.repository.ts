import { CategoryEntity } from './entities/category.entity';
import { CategoryModel } from '@models/categories.model';

export interface CategoryRepository {
  create: (data: CategoryEntity) => Promise<CategoryModel>;
  findOneById(id: string): Promise<CategoryModel>;
  findByIds(ids: string[]): Promise<CategoryModel[]>;
  findAll(): Promise<CategoryModel[]>;
  update(category: CategoryModel, data: CategoryEntity): Promise<CategoryModel>;
  delete(id: string): Promise<any>;
}
