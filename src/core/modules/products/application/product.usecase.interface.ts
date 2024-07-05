import { ProductEntity } from '@productDomain/entities/product.entity';

export interface IProductUseCase {
  create: (payload: CreateProductPayload) => Promise<ProductEntity>;
  findOneById(id: string): Promise<ProductEntity>;
  findByIds(ids: string[]): Promise<ProductEntity[]>;
  findAll(): Promise<ProductEntity[]>;
  update(payload: UpdateProductPayload): Promise<ProductEntity>;
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
