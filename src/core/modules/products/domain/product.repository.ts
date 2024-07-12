import { ProductEntity } from './entities/product.entity';
import { ProductModel } from '@models/product.model';

export interface ProductRepository {
  create: (payload: ProductEntity) => Promise<ProductModel>;
  findOneBySku(id: string): Promise<ProductModel>;
  findBySkus(skus: string[]): Promise<ProductModel[]>;
  findAll(): Promise<ProductModel[]>;
  update(product: ProductModel, payload: ProductEntity): Promise<ProductModel>;
  updateStockOrder(product: ProductModel): Promise<ProductModel>;
  delete(id: string): Promise<any>;
}
