import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';
import { OrderStatus } from '@orderDomain/entities/orderStatus.entity';
import { OrderModel } from '@models/order.model';

export interface IOrderUseCase {
  create: (payload: CreateOrderPayload) => Promise<OrderModel>;
  findOneById(id: string): Promise<OrderModel>;
  findByIds(ids: string[]): Promise<OrderModel[]>;
  findAll(): Promise<OrderModel[]>;
  update(payload: UpdateOrderPayload): Promise<OrderModel>;
  delete(id: string): Promise<any>;
}

export interface OrderDetailsPayload
  extends Pick<
    OrderDetailsEntity,
    Exclude<keyof OrderDetailsEntity, 'id' | 'orderId'>
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
