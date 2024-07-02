export interface IProductUseCase {
  create: (data: any) => Promise<any>;
  findOneById(id: string): Promise<any>;
  findByIds(ids: string[]): Promise<any>;
  findAll(): Promise<any>;
  update(id: string, data: any): Promise<any>;
}

export interface ProductCreatePayload {
  name: string;
  description: string;
}
