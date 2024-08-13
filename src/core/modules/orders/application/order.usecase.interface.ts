import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';
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

export interface OrderDetailsPayload
  extends Pick<
    OrderDetailsEntity,
    Exclude<keyof OrderDetailsEntity, 'id' | 'orderId' | 'audit'>
  > {}

export interface CreateOrderPayload {
  customerId: string;
  status: OrderStatus;
  details: OrderDetailsPayload;
}

export interface UpdateOrderPayload extends CreateOrderPayload {
  id: string;
  createdAt: string;
  orderDetailsId: string;
}
