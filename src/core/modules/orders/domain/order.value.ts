import { v4 as uuid } from 'uuid';
import { CreateOrderPayload } from '@orderApplication/order.usecase.interface';
import { OrderEntity } from './entities/order.entity';

export class OrderValue {
  public create = (
    orderPayload: CreateOrderPayload,
    orderDetailsId: string,
  ): OrderEntity => {
    return {
      id: uuid(),
      createdAt: new Date().toISOString(),
      // TODO ORDERDETAILSID
      orderDetailsId,
      ...orderPayload,
    };
  };
}
