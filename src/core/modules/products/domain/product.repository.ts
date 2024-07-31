import { ProductEntity } from './entities/product.entity';
import { ProductModel } from '@models/product.model';

export interface ProductRepository {
  create: (payload: ProductEntity) => Promise<ProductModel>;
  findOneBySku(sku: string): Promise<ProductModel>;
  findBySkus(skus: string[]): Promise<ProductModel[]>;
  findAll(): Promise<ProductModel[]>;
  update(product: ProductModel, payload: ProductEntity): Promise<ProductModel>;
  updateStock(product: ProductModel): Promise<ProductModel>;
  delete(sku: string): Promise<any>;
}
