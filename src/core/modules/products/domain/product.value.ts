import { v4 as uuid } from 'uuid';
import { ProductCreatePayload } from '@productApplication/product.usecase.interface';
import { ProductEntity } from './entities/product.entity';

export class ProductValue {
  public create = (productPayload: ProductCreatePayload): ProductEntity => {
    return {
      id: uuid(),
      ...productPayload,
    };
  };
}
