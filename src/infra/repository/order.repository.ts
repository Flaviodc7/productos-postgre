import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderRepository } from '@orderDomain/order.repository';
import { OrderEntity } from '@orderDomain/entities/order.entity';
import { OrderModel } from '@models/order.model';

@Injectable()
export class OrderPostgreRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderModel)
    private orderRepository: Repository<OrderModel>,
  ) {}

  async findAll(): Promise<OrderModel[]> {
    return await this.orderRepository.find();
  }

  async findOneById(id: string): Promise<OrderModel> {
    return await this.orderRepository.findOne({
      where: { id: id },
    });
  }

  async findByIds(ids: string[]): Promise<OrderModel[]> {
    return await this.orderRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(payload: OrderEntity): Promise<OrderModel> {
    const newOrder = this.orderRepository.create(payload);

    return await this.orderRepository.save(newOrder);
  }

  async update(
    category: OrderModel,
    payload: OrderEntity,
  ): Promise<OrderModel> {
    this.orderRepository.merge(category, payload);
    return await this.orderRepository.save(category);
  }

  async delete(id: string): Promise<any> {
    return await this.orderRepository.delete(id);
  }
}
