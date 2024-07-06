import { ProductModel } from '@models/product.model';

export interface IProductUseCase {
  create: (payload: CreateProductPayload) => Promise<ProductModel>;
  findOneById(id: string): Promise<ProductModel>;
  findByIds(ids: string[]): Promise<ProductModel[]>;
  findAll(): Promise<ProductModel[]>;
  update(payload: UpdateProductPayload): Promise<ProductModel>;
  delete(id: string): Promise<any>;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  subcategoryIds?: string[];
}

export interface UpdateProductPayload extends CreateProductPayload {
  id: string;
}
