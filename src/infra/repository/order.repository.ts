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
    private categoryRepository: Repository<OrderModel>,
  ) {}

  async findAll(): Promise<OrderModel[]> {
    return await this.categoryRepository.find({ relations: ['subcategories'] });
  }

  async findOneById(id: string): Promise<OrderModel> {
    return await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['subcategories'],
    });
  }

  async findByIds(ids: string[]): Promise<OrderModel[]> {
    return await this.categoryRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(payload: OrderEntity): Promise<OrderModel> {
    const newOrder = this.categoryRepository.create(payload);

    return await this.categoryRepository.save(newOrder);
  }

  async update(
    category: OrderModel,
    payload: OrderEntity,
  ): Promise<OrderModel> {
    this.categoryRepository.merge(category, payload);
    return await this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<any> {
    return await this.categoryRepository.delete(id);
  }
}
