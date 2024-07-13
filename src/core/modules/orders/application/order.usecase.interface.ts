import { OrderModel } from '@models/order.model';

export interface IOrderUseCase {
  create: (payload: CreateOrderPayload) => Promise<OrderModel>;
  findOneById(id: string): Promise<OrderModel>;
  findByIds(ids: string[]): Promise<OrderModel[]>;
  findAll(): Promise<OrderModel[]>;
  update(payload: UpdateOrderPayload): Promise<OrderModel>;
  delete(id: string): Promise<any>;
}

export interface CreateOrderPayload {
  customerId: string;
  paymentDetailsId: string;
  productsOrderId: string;
}

export interface UpdateOrderPayload extends CreateOrderPayload {
  id: string;
  createdAt: string;
}
