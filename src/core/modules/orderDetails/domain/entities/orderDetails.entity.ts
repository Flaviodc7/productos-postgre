import { OrderEntity } from '@orderDomain/entities/order.entity';
import { OrderAuditEntity } from './orderAudit.entity';
import { OrderDeliveryEntity } from './orderDelivery.entity';
import { OrderPaymentEntity } from './orderPayment.entity';
import { OrderProductEntity } from './orderProduct.entity';

export interface OrderDetailsEntity {
  id: string;
  audit: OrderAuditEntity[];
  payment: OrderPaymentEntity;
  products: OrderProductEntity[];
  delivery?: OrderDeliveryEntity;
  order: OrderEntity;
}
