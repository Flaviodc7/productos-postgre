import { Payment } from './payment.entity';
import { ProductOrderEntity } from './productOrder.entity';

export interface OrderEntity {
  id: string;
  createdAt: string;
  customerId: string;
  payment: Payment;
  productsOrder: ProductOrderEntity[];
}
