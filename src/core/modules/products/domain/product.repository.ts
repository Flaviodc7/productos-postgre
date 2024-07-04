import { ProductModel } from '../../../../infra/models/product.model';
import { ProductEntity } from './entities/product.entity';

export interface ProductRepository {
  create: (data: ProductEntity) => Promise<ProductModel>;
  findOneById(id: string): Promise<ProductModel>;
  findByIds(ids: string[]): Promise<ProductModel[]>;
  findAll(): Promise<ProductModel[]>;
  update(id: string, data: any): Promise<ProductModel>;
  delete(id: string): Promise<any>;
}
