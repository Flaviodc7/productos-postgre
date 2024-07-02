import { ProductCreatePayload } from '../application/product.usecase.interface';
import { v4 as uuid } from 'uuid';
import { ProductEntity } from './entities/product.entity';

export class ProductValue {
  public create = (productPayload: ProductCreatePayload): ProductEntity => {
    return {
      id: uuid(),
      ...productPayload,
    };
  };
}
