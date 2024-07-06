import { CategoryEntity } from '@categoriesDomain/entities/category.entity';

export interface ICategoriesUseCase {
  create: (payload: CreateCategoriesPayload) => Promise<CategoryEntity>;
  findOneById(id: string): Promise<CategoryEntity>;
  findByIds(ids: string[]): Promise<CategoryEntity[]>;
  findAll(): Promise<CategoryEntity[]>;
  update(payload: UpdateCategoriesPayload): Promise<CategoryEntity>;
  delete(id: string): Promise<any>;
}

export interface CreateCategoriesPayload {
  name: string;
  description: string;
}

export interface UpdateCategoriesPayload extends CreateCategoriesPayload {
  id: string;
}
