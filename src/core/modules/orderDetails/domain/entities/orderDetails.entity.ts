import { OrderAuditEntity } from './orderAudit.entity';
import { OrderDeliveryEntity } from './orderDelivery.entity';
import { OrderPaymentEntity } from './orderPayment.entity';
import { OrderProductEntity } from './orderProduct.entity';

export interface OrderDetailsEntity {
  id: string;
  audit: OrderAuditEntity[];
  orderId: string;
  payment: OrderPaymentEntity;
  products: OrderProductEntity[];
  delivery?: OrderDeliveryEntity;
}
