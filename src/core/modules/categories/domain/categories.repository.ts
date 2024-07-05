import { CategoryEntity } from './entities/category.entity';

export interface CategoryRepository {
  create: (data: CategoryEntity) => Promise<CategoryEntity>;
  findOneById(id: string): Promise<CategoryEntity>;
  findByIds(ids: string[]): Promise<CategoryEntity[]>;
  findAll(): Promise<CategoryEntity[]>;
  update(data: CategoryEntity): Promise<CategoryEntity>;
  delete(id: string): Promise<any>;
}
