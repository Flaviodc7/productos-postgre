import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';
import { OrderDetailsModel } from '@models/orderDetails.model';

export interface IOrderDetailsUseCase {
  create: (payload: CreateOrderDetailsPayload) => Promise<OrderDetailsModel>;
  findOneById(id: string): Promise<OrderDetailsModel>;
  findByIds(ids: string[]): Promise<OrderDetailsModel[]>;
  update(payload: UpdateOrderDetailsPayload): Promise<OrderDetailsModel>;
  delete(id: string): Promise<any>;
}

export interface CreateOrderDetailsPayload
  extends Pick<
    OrderDetailsEntity,
    Exclude<keyof OrderDetailsEntity, 'id' | 'orderId'>
  > {}

export interface UpdateOrderDetailsPayload extends CreateOrderDetailsPayload {
  id: string;
  orderId: string;
}
