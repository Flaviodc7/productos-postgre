import { OrderDeliveryEntity } from '@orderDetailsDomain/entities/orderDelivery.entity';
import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';
import { OrderPaymentEntity } from '@orderDetailsDomain/entities/orderPayment.entity';
import { OrderProductEntity } from '@orderDetailsDomain/entities/orderProduct.entity';

export interface IOrderDetailsUseCase {
  create: (payload: CreateOrderDetailsPayload) => Promise<OrderDetailsEntity>;
  findOneById(id: string): Promise<OrderDetailsEntity>;
  findByIds(ids: string[]): Promise<OrderDetailsEntity[]>;
  findAll(): Promise<OrderDetailsEntity[]>;
  update(payload: UpdateOrderDetailsPayload): Promise<OrderDetailsEntity>;
  delete(id: string): Promise<any>;
}

export interface OrderPaymentCreatePayload
  extends Omit<OrderPaymentEntity, 'id'> {}

export interface OrderProductCreatePayload
  extends Omit<OrderProductEntity, 'id' | 'details'> {}

export interface OrderDeliveryCreatePayload
  extends Omit<OrderDeliveryEntity, 'id'> {}

export interface CreateOrderDetailsPayload {
  payment: OrderPaymentCreatePayload;
  products: OrderProductCreatePayload[];
  delivery?: OrderDeliveryCreatePayload;
}

export interface OrderPaymentUpdatePayload extends OrderPaymentEntity {}

export interface OrderProductUpdatePayload extends Omit<OrderProductEntity, 'details'> {}

export interface OrderDeliveryUpdatePayload extends OrderDeliveryEntity {}

export interface UpdateOrderDetailsPayload extends CreateOrderDetailsPayload {
  id: string;
  orderId: string;
  payment: OrderPaymentUpdatePayload;
  products: OrderProductUpdatePayload[];
  delivery?: OrderDeliveryUpdatePayload;
}
