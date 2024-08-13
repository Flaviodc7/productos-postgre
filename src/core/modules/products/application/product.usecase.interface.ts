import { ProductEntity } from '@productDomain/entities/product.entity';

export interface IProductUseCase {
  create: (payload: CreateProductPayload) => Promise<ProductEntity>;
  findOneBySku(sku: string): Promise<ProductEntity>;
  findBySkus(ids: string[]): Promise<ProductEntity[]>;
  findAll(): Promise<ProductEntity[]>;
  update(payload: UpdateProductPayload): Promise<ProductEntity>;
  updateStockOrder(
    productsOrder: UpdateProductsOrderPayload[],
  ): Promise<ProductEntity[]>;
  updateStockInventory: (
    productsInventory: UpdateProductsInventoryPayload[],
  ) => Promise<ProductEntity[]>;
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
  quantity: number;
}

export interface UpdateProductsOrderPayload
  extends UpdateProductsInventoryPayload {
  name: string;
  price: number;
}
