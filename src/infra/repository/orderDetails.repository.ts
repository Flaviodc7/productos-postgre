import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderDetailsRepository } from '@orderDetailsDomain/orderDetails.repository';
import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';
import { OrderDetailsModel } from '@models/orderDetails.model';

@Injectable()
export class OrderDetailsPostgreRepository implements OrderDetailsRepository {
  constructor(
    @InjectRepository(OrderDetailsModel)
    private orderRepository: Repository<OrderDetailsModel>,
  ) {}

  async findOneById(id: string): Promise<OrderDetailsModel> {
    return await this.orderRepository.findOne({
      where: { id: id },
    });
  }

  async findByIds(ids: string[]): Promise<OrderDetailsModel[]> {
    return await this.orderRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(payload: OrderDetailsEntity): Promise<OrderDetailsModel> {
    const newOrder = this.orderRepository.create(payload);

    return await this.orderRepository.save(newOrder);
  }

  async update(
    category: OrderDetailsModel,
    payload: OrderDetailsEntity,
  ): Promise<OrderDetailsModel> {
    this.orderRepository.merge(category, payload);
    return await this.orderRepository.save(category);
  }

  async delete(id: string): Promise<any> {
    return await this.orderRepository.delete(id);
  }
}
