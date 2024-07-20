import { OrderDetailsEntity } from './entities/orderDetails.entity';
import { OrderDetailsModel } from '@models/orderDetails/orderDetails.model';

export interface OrderDetailsRepository {
  create: (data: OrderDetailsEntity) => Promise<OrderDetailsModel>;
  findOneById(id: string): Promise<OrderDetailsModel>;
  findByIds(ids: string[]): Promise<OrderDetailsModel[]>;
  update(
    category: OrderDetailsModel,
    data: OrderDetailsEntity,
  ): Promise<OrderDetailsModel>;
  delete(id: string): Promise<any>;
}
