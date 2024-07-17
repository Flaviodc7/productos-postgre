import { OrderStatus } from './orderStatus.entity';

export interface OrderEntity {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customerId: string;
  orderDetailsId: string;
}
