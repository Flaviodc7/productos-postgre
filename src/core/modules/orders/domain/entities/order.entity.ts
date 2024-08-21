import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';
import { CustomerEntity } from '@customersDomain/entities/customer.entity';
import { OrderStatus } from './orderStatus.entity';

export interface OrderEntity {
  id: string;
  createdAt: string;
  status: OrderStatus;
  details: OrderDetailsEntity;
  customer: CustomerEntity;
}
