import { ProductModel } from '@models/product.model';

export interface IProductUseCase {
  create: (payload: CreateProductPayload) => Promise<ProductModel>;
  findOneBySku(id: string): Promise<ProductModel>;
  findBySkus(ids: string[]): Promise<ProductModel[]>;
  findAll(): Promise<ProductModel[]>;
  update(payload: UpdateProductPayload): Promise<ProductModel>;
  updateStockOrder(sku: string, quantity: number): Promise<ProductModel>;
  delete(id: string): Promise<any>;
}

export interface CreateProductPayload {
  sku: string;
  name: string;
  price: number;
  stock: number;
  photoUrl?: string;
  ean?: string;
  description?: string;
  subcategoryIds?: string[];
}

export interface UpdateProductPayload extends CreateProductPayload {}
