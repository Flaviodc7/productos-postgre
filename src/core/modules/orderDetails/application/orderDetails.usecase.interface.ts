import { OrderDetailsModel } from '@models/categories.model';

export interface IOrderDetailsUseCase {
  create: (payload: CreateOrderDetailsPayload) => Promise<OrderDetailsModel>;
  findOneById(id: string): Promise<OrderDetailsModel>;
  findByIds(ids: string[]): Promise<OrderDetailsModel[]>;
  findAll(): Promise<OrderDetailsModel[]>;
  update(payload: UpdateOrderDetailsPayload): Promise<OrderDetailsModel>;
  delete(id: string): Promise<any>;
}

export interface CreateOrderDetailsPayload {
  name: string;
  description: string;
}

export interface UpdateOrderDetailsPayload extends CreateOrderDetailsPayload {
  id: string;
}
