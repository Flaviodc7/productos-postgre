import { ProductEntity } from './entities/product.entity';

export interface ProductRepository {
  create: (payload: ProductEntity) => Promise<ProductEntity>;
  findOneBySku(sku: string): Promise<ProductEntity>;
  findBySkus(skus: string[]): Promise<ProductEntity[]>;
  findAll(): Promise<ProductEntity[]>;
  update(
    product: ProductEntity,
    payload: ProductEntity,
  ): Promise<ProductEntity>;
  updateStock(product: ProductEntity): Promise<ProductEntity>;
  delete(sku: string): Promise<any>;
}
