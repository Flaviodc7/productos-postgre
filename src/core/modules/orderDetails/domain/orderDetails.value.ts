import { v4 as uuid } from 'uuid';
import { CreateOrderDetailsPayload } from '@orderDetailsApplication/orderDetails.usecase.interface';
import { OrderDetailsEntity } from './entities/orderDetails.entity';

export class OrderDetailsValue {
  public create = (
    orderDetailsPayload: CreateOrderDetailsPayload,
  ): OrderDetailsEntity => {
    return {
      id: uuid(),
      ...orderDetailsPayload,
    };
  };
}
