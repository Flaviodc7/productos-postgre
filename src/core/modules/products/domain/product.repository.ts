import { ProductEntity } from './entities/product.entity';

export interface ProductRepository {
  create: (payload: ProductEntity) => Promise<ProductEntity>;
  findOneById(id: string): Promise<ProductEntity>;
  findByIds(ids: string[]): Promise<ProductEntity[]>;
  findAll(): Promise<ProductEntity[]>;
  update(payload: ProductEntity): Promise<ProductEntity>;
  delete(id: string): Promise<any>;
}
