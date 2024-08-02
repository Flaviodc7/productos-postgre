import { NotFoundException } from '@nestjs/common';
import {
  CreateOrderPayload,
  IOrderUseCase,
  UpdateOrderPayload,
} from './order.usecase.interface';
import { OrderDetailsUseCase } from '@orderDetailsApplication/orderDetails.usecase';
import { CustomerEntity } from '@customersDomain/entities/customer.entity';
import { CustomerUseCase } from '@customersApplication/customer.usecase';
import { OrderRepository } from '@orderDomain/order.repository';
import { OrderValue } from '@orderDomain/order.value';
import { OrderModel } from '@models/order.model';

export class OrderUseCase implements IOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderDetailsUseCase: OrderDetailsUseCase,
    private readonly customerUseCase: CustomerUseCase,
  ) {}

  async create(payload: CreateOrderPayload): Promise<OrderModel> {
    const { details, customerId } = payload;

    const customer = (await this.customerUseCase.findOneById(
      customerId,
    )) as CustomerEntity;

    if (!customer) {
      throw new NotFoundException(`Customer #${customerId} not found`);
    }

    const orderDetails = await this.orderDetailsUseCase.create(details);

    const orderValue = new OrderValue().create(payload, orderDetails.id);

    return await this.orderRepository.create(orderValue, customer);
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
