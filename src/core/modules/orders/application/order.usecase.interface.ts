import { OrderDeliveryEntity } from '@orderDetailsDomain/entities/orderDelivery.entity';
import { OrderPaymentEntity } from '@orderDetailsDomain/entities/orderPayment.entity';
import { OrderProductEntity } from '@orderDetailsDomain/entities/orderProduct.entity';
import { OrderEntity } from '@orderDomain/entities/order.entity';
import { OrderStatus } from '@orderDomain/entities/orderStatus.entity';

export interface IOrderUseCase {
  create: (payload: CreateOrderPayload) => Promise<OrderEntity>;
  findOneById(id: string): Promise<OrderEntity>;
  findByIds(ids: string[]): Promise<OrderEntity[]>;
  findAll(): Promise<OrderEntity[]>;
  update(payload: UpdateOrderPayload): Promise<OrderEntity>;
  delete(id: string): Promise<any>;
}

export interface OrderPaymentCreatePayload
  extends Omit<OrderPaymentEntity, 'id'> {}

export interface OrderProductCreatePayload
  extends Omit<OrderProductEntity, 'id' | 'details'> {}

export interface OrderDeliveryCreatePayload
  extends Omit<OrderDeliveryEntity, 'id'> {}

export interface OrderDetailsCreatePayload {
  payment: OrderPaymentCreatePayload;
  products: OrderProductCreatePayload[];
  delivery?: OrderDeliveryCreatePayload;
}

export interface CreateOrderPayload {
  customerId: string;
  details: OrderDetailsCreatePayload;
}

export interface UpdateOrderPayload extends CreateOrderPayload {
  id: string;
  createdAt: string;
  orderDetailsId: string;
  status: OrderStatus;
}
