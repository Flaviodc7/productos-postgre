import { SubcategoryEntity } from '../domain/entities/subcategory.entity';

export interface ISubcategoriesUseCase {
  create: (payload: CreateSubcategoriesPayload) => Promise<SubcategoryEntity>;
  findOneById(id: string): Promise<SubcategoryEntity>;
  findByIds(ids: string[]): Promise<SubcategoryEntity[]>;
  findAll(): Promise<SubcategoryEntity[]>;
  update(payload: UpdateSubcategoriesPayload): Promise<SubcategoryEntity>;
}

export interface CreateSubcategoriesPayload {
  name: string;
  description?: string;
  categoryId: string;
  productIds?: string[];
}

export interface UpdateSubcategoriesPayload extends CreateSubcategoriesPayload {
  id: string;
}
