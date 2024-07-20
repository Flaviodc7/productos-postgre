import { NotFoundException } from '@nestjs/common';
import {
  CreateOrderPayload,
  IOrderUseCase,
  UpdateOrderPayload,
} from './order.usecase.interface';
import { OrderDetailsUseCase } from '@orderDetailsApplication/orderDetails.usecase';
import { OrderRepository } from '@orderDomain/order.repository';
import { OrderValue } from '@orderDomain/order.value';
import { OrderModel } from '@models/order.model';

export class OrderUseCase implements IOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderDetailsUseCase: OrderDetailsUseCase,
  ) {}

  async create(payload: CreateOrderPayload): Promise<OrderModel> {
    const { details } = payload;
    const orderDetailsValue = await this.orderDetailsUseCase.create(details);

    const orderValue = new OrderValue().create(payload, orderDetailsValue.id);

    return await this.orderRepository.create(orderValue);
  }

  async findOneById(id: string): Promise<OrderModel> {
    const order = await this.orderRepository.findOneById(id);

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return order;
  }

  async findByIds(ids: string[]): Promise<OrderModel[]> {
    return await this.orderRepository.findByIds(ids);
  }

  async findAll(): Promise<OrderModel[]> {
    return await this.orderRepository.findAll();
  }

  async update(payload: UpdateOrderPayload): Promise<OrderModel> {
    const { id } = payload;

    const order = (await this.findOneById(id)) as OrderModel;

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return await this.orderRepository.update(order, payload);
  }

  async delete(id: string) {
    return await this.orderRepository.delete(id);
  }
}
