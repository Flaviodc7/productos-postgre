import { OrderEntity } from './entities/order.entity';

export interface OrderRepository {
  create: (data: OrderEntity) => Promise<OrderEntity>;
  findOneById(id: string): Promise<OrderEntity>;
  findByIds(ids: string[]): Promise<OrderEntity[]>;
  findAll(): Promise<OrderEntity[]>;
  update(order: OrderEntity, payload: OrderEntity): Promise<OrderEntity>;
  delete(id: string): Promise<any>;
}
