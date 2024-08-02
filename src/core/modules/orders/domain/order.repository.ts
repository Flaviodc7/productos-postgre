import { CustomerEntity } from '@customersDomain/entities/customer.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderModel } from '@models/order.model';

export interface OrderRepository {
  create: (data: OrderEntity, customer: CustomerEntity) => Promise<OrderModel>;
  findOneById(id: string): Promise<OrderModel>;
  findByIds(ids: string[]): Promise<OrderModel[]>;
  findAll(): Promise<OrderModel[]>;
  update(category: OrderModel, data: OrderEntity): Promise<OrderModel>;
  delete(id: string): Promise<any>;
}
