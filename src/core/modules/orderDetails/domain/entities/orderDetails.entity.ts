import { PaymentDetailsEntity } from './paymentDetails.entity';
import { OrderDeliveryEntity } from './deliveryDetails.entity';
import { ProductOrderEntity } from './productDetails.entity';

export interface OrderDetailsEntity {
  id: string;
  customerId: string;
  orderId: string;
  paymentDetails: PaymentDetailsEntity;
  productsOrder: ProductOrderEntity[];
  delivery?: OrderDeliveryEntity;
}
