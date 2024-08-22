import { OrderDetailsEntity } from './entities/orderDetails.entity';

export interface OrderDetailsRepository {
  create: (data: OrderDetailsEntity) => Promise<OrderDetailsEntity>;
  findOneById(id: string): Promise<OrderDetailsEntity>;
  findByIds(ids: string[]): Promise<OrderDetailsEntity[]>;
  findAll(): Promise<OrderDetailsEntity[]>;
  update(
    orderDetails: OrderDetailsEntity,
    data: OrderDetailsEntity,
  ): Promise<OrderDetailsEntity>;
  delete(id: string): Promise<any>;
}
