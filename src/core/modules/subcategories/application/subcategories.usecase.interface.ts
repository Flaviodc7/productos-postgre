export interface ISubcategoriesUseCase {
  create: (data: any) => Promise<any>;
  findOneById(id: string): Promise<any>;
  findByIds(ids: string[]): Promise<any>;
  findAll(): Promise<any>;
  update(id: string, data: any): Promise<any>;
}

export interface SubcategoriesCreatePayload {
  name: string;
  description: string;
  categoryId: string;
}
