import { ProductEntity } from './entities/product.entity';
import { ProductModel } from '@models/product.model';

export interface ProductRepository {
  create: (payload: ProductEntity) => Promise<ProductModel>;
  findOneById(id: string): Promise<ProductModel>;
  findByIds(ids: string[]): Promise<ProductModel[]>;
  findAll(): Promise<ProductModel[]>;
  update(payload: ProductEntity): Promise<ProductModel>;
  delete(id: string): Promise<any>;
}
