export interface ICategoriesUseCase {
  create: (data: any) => Promise<any>;
  findOneById(id: string): Promise<any>;
  findByIds(ids: string[]): Promise<any>;
  findAll(): Promise<any>;
  update(id: string, data: any): Promise<any>;
}

export interface CategoriesCreatePayload {
  name: string;
  description: string;
}
