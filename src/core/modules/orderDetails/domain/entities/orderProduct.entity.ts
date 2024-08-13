import { OrderDetailsEntity } from './orderDetails.entity';

export interface OrderProductEntity {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  orderDetails: OrderDetailsEntity;
}
