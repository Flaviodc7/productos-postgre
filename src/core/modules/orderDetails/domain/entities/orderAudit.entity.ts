import { OrderDetailsEntity } from './orderDetails.entity';

export interface OrderAuditEntity {
  id: string;
  date: string;
  description: string;
  responsible: string;
  orderDetails: OrderDetailsEntity;
}
