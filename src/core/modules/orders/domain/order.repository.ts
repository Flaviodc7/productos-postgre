import { CustomerEntity } from '@customersDomain/entities/customer.entity';
import { OrderEntity } from './entities/order.entity';

export interface OrderRepository {
  create: (data: OrderEntity, customer: CustomerEntity) => Promise<OrderEntity>;
  findOneById(id: string): Promise<OrderEntity>;
  findByIds(ids: string[]): Promise<OrderEntity[]>;
  findAll(): Promise<OrderEntity[]>;
  update(category: OrderEntity, data: OrderEntity): Promise<OrderEntity>;
  delete(id: string): Promise<any>;
}
