import { CategoryModel } from '@models/categories.model';

export interface ICategoriesUseCase {
  create: (payload: CreateCategoriesPayload) => Promise<CategoryModel>;
  findOneById(id: string): Promise<CategoryModel>;
  findByIds(ids: string[]): Promise<CategoryModel[]>;
  findAll(): Promise<CategoryModel[]>;
  update(payload: UpdateCategoriesPayload): Promise<CategoryModel>;
  delete(id: string): Promise<any>;
}

export interface CreateCategoriesPayload {
  name: string;
  description?: string;
}

export interface UpdateCategoriesPayload extends CreateCategoriesPayload {
  id: string;
}
