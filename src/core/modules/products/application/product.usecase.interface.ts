import { ProductModel } from '@models/product.model';

export interface IProductUseCase {
  create: (payload: CreateProductPayload) => Promise<ProductModel>;
  findOneBySku(sku: string): Promise<ProductModel>;
  findBySkus(ids: string[]): Promise<ProductModel[]>;
  findAll(): Promise<ProductModel[]>;
  update(payload: UpdateProductPayload): Promise<ProductModel>;
  updateStockOrder(sku: string, quantity: number): Promise<ProductModel>;
  updateStockInventory: (
    productsInventory: UpdateProductsInventoryPayload[],
  ) => Promise<ProductModel[]>;
  delete(sku: string): Promise<any>;
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

export interface UpdateProductsInventoryPayload {
  sku: string;
  name: string;
  quantity: number;
}
