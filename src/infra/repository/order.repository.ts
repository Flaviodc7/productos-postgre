import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { OrderEntity } from '@orderDomain/entities/order.entity';
import { OrderRepository } from '@orderDomain/order.repository';
import { OrderModel } from '@models/order.model';

@Injectable()
export class OrderPostgreRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderModel)
    private orderRepository: Repository<OrderModel>,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }

  async findOneById(id: string): Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: { id: id },
    });
  }

  async findByIds(ids: string[]): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    const newOrder = this.orderRepository.create(order);

    return await this.orderRepository.save(newOrder);
  }

  async update(order: OrderEntity, payload: OrderEntity): Promise<OrderEntity> {
    this.orderRepository.merge(order, payload);
    return await this.orderRepository.save(order);
  }

  async delete(id: string): Promise<any> {
    return await this.orderRepository.delete(id);
  }
}
