export interface ISubcategoriesUseCase {
  create: (payload: CreateSubcategoriesPayload) => Promise<any>;
  findOneById(id: string): Promise<any>;
  findByIds(ids: string[]): Promise<any>;
  findAll(): Promise<any>;
  update(payload: UpdateSubcategoriesPayload): Promise<any>;
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
