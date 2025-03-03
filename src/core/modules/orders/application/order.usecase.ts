import logger from '@src/logger';
import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import {
  CreateOrderPayload,
  IOrderUseCase,
  UpdateOrderPayload,
} from './order.usecase.interface';
import { OrderDetailsUseCase } from '@orderDetailsApplication/orderDetails.usecase';
import { CustomerUseCase } from '@customersApplication/customer.usecase';
import { OrderRepository } from '@orderDomain/order.repository';
import { OrderValue } from '@orderDomain/order.value';
import { OrderEntity } from '@orderDomain/entities/order.entity';

export class OrderUseCase implements IOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
    @Inject(forwardRef(() => OrderDetailsUseCase))
    private readonly orderDetailsUseCase: OrderDetailsUseCase,
    @Inject(forwardRef(() => CustomerUseCase))
    private readonly customerUseCase: CustomerUseCase,
  ) {}

  async create(payload: CreateOrderPayload): Promise<OrderEntity> {
    const { details, customerId } = payload;

    const customer = await this.customerUseCase.findOneById(customerId);

    if (!customer) {
      logger.log('error', `Customer #${customerId} not found`);
      throw new NotFoundException(`Customer #${customerId} not found`);
    }

    const orderDetails = await this.orderDetailsUseCase.create(details);

    const orderValue = new OrderValue().create(payload, customer, orderDetails);

    return await this.orderRepository.create(orderValue);
  }

  async findOneById(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOneById(id);

    if (!order) {
      logger.log('error', `Order #${id} not found`);
      throw new NotFoundException(`Order #${id} not found`);
    }

    return order;
  }

  async findByIds(ids: string[]): Promise<OrderEntity[]> {
    return await this.orderRepository.findByIds(ids);
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.findAll();
  }

  async update(payload: UpdateOrderPayload): Promise<OrderEntity> {
    const { id, customerId, orderDetailsId } = payload;

    const order = await this.findOneById(id);

    const customer = await this.customerUseCase.findOneById(customerId);

    const orderDetails =
      await this.orderDetailsUseCase.findOneById(orderDetailsId);

    const orderValue = new OrderValue().update(
      payload,
      order,
      customer,
      orderDetails,
    );

    return await this.orderRepository.update(order, orderValue);
  }

  async delete(id: string) {
    const result = await this.orderRepository.delete(id);

    if (result.affected === 0) {
      logger.log('error', `Product #${id} not found`);
      throw new NotFoundException(`Product #${id} not found`);
    }

    return result;
  }
}
