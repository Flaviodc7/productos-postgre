import { v4 as uuid } from 'uuid';
import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';
import {
  CreateOrderPayload,
  UpdateOrderPayload,
} from '@orderApplication/order.usecase.interface';
import { OrderEntity } from './entities/order.entity';
import { CustomerEntity } from '@customersDomain/entities/customer.entity';

export class OrderValue {
  public create = (
    orderPayload: CreateOrderPayload,
    customer: CustomerEntity,
    details: OrderDetailsEntity,
  ): OrderEntity => {
    return {
      ...orderPayload,
      id: uuid(),
      customer,
      createdAt: new Date().toISOString(),
      status: 'CREATED',
      details,
    };
  };

  public update = (
    payload: UpdateOrderPayload,
    orderPayload: OrderEntity,
    customer: CustomerEntity,
    details: OrderDetailsEntity,
  ): OrderEntity => {
    const { id, createdAt, status } = orderPayload;

    const order = {
      id,
      createdAt,
      status,
      ...payload,
    };

    return {
      ...order,
      customer,
      details,
    };
  };
}
