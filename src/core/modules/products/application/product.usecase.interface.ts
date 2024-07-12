import { ProductModel } from '@models/product.model';

export interface IProductUseCase {
  create: (payload: CreateProductPayload) => Promise<ProductModel>;
  findOneBySku(id: string): Promise<ProductModel>;
  findBySkus(ids: string[]): Promise<ProductModel[]>;
  findAll(): Promise<ProductModel[]>;
  update(payload: UpdateProductPayload): Promise<ProductModel>;
  delete(id: string): Promise<any>;
}

export interface CreateProductPayload {
  sku: string;
  name: string;
  photoUrl: string;
  price: number;
  stock: number;
  ean?: string;
  description?: string;
  subcategoryIds?: string[];
}

export interface UpdateProductPayload extends CreateProductPayload {}
