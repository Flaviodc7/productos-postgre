import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';

export interface IOrderDetailsUseCase {
  create: (payload: CreateOrderDetailsPayload) => Promise<OrderDetailsEntity>;
  findOneById(id: string): Promise<OrderDetailsEntity>;
  findByIds(ids: string[]): Promise<OrderDetailsEntity[]>;
  update(payload: UpdateOrderDetailsPayload): Promise<OrderDetailsEntity>;
  delete(id: string): Promise<any>;
}

export interface CreateOrderDetailsPayload
  extends Pick<
    OrderDetailsEntity,
    Exclude<keyof OrderDetailsEntity, 'id' | 'orderId' | 'audit'>
  > {}

export interface UpdateOrderDetailsPayload extends CreateOrderDetailsPayload {
  id: string;
  orderId: string;
}
