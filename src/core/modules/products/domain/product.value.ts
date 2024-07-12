import { CreateProductPayload } from '@productApplication/product.usecase.interface';
import { ProductEntity } from './entities/product.entity';

export class ProductValue {
  public create = (productPayload: CreateProductPayload): ProductEntity => {
    return {
      ...productPayload,
    };
  };
}
