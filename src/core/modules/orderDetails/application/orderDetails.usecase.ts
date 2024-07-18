import { NotFoundException } from '@nestjs/common';
import {
  IOrderDetailsUseCase,
  UpdateOrderDetailsPayload,
} from './orderDetails.usecase.interface';
import { OrderDetailsRepository } from '@orderDetailsDomain/orderDetails.repository';
import { OrderDetailsModel } from '@models/orderDetails.model';
import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';

export class OrderUseCase implements IOrderDetailsUseCase {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
  ) {}

  async create(payload: OrderDetailsEntity): Promise<OrderDetailsModel> {
    return await this.orderDetailsRepository.create(payload);
  }

  async findOneById(id: string): Promise<OrderDetailsModel> {
    const order = await this.orderDetailsRepository.findOneById(id);

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return order;
  }

  async findByIds(ids: string[]): Promise<OrderDetailsModel[]> {
    return await this.orderDetailsRepository.findByIds(ids);
  }

  async findAll(): Promise<OrderDetailsModel[]> {
    return await this.orderDetailsRepository.findAll();
  }

  async update(payload: UpdateOrderDetailsPayload): Promise<OrderDetailsModel> {
    const { id } = payload;

    const order = (await this.findOneById(id)) as OrderDetailsModel;

    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }

    return await this.orderDetailsRepository.update(order, payload);
  }

  async delete(id: string) {
    return await this.orderDetailsRepository.delete(id);
  }
}
