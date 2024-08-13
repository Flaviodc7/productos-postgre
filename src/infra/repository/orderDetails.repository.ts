import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderDetailsRepository } from '@orderDetailsDomain/orderDetails.repository';
import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';
import { OrderDetailsModel } from '@models/orderDetails/orderDetails.model';

@Injectable()
export class OrderDetailsPostgreRepository implements OrderDetailsRepository {
  constructor(
    @InjectRepository(OrderDetailsModel)
    private orderRepository: Repository<OrderDetailsModel>,
  ) {}

  async findOneById(id: string): Promise<OrderDetailsEntity> {
    return await this.orderRepository.findOne({
      where: { id: id },
    });
  }

  async findByIds(ids: string[]): Promise<OrderDetailsEntity[]> {
    return await this.orderRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(payload: OrderDetailsEntity): Promise<OrderDetailsEntity> {
    const newOrder = this.orderRepository.create(payload);

    return await this.orderRepository.save(newOrder);
  }

  async update(
    orderDetails: OrderDetailsEntity,
    payload: OrderDetailsEntity,
  ): Promise<OrderDetailsEntity> {
    this.orderRepository.merge(orderDetails, payload);
    return await this.orderRepository.save(orderDetails);
  }

  async delete(id: string): Promise<any> {
    return await this.orderRepository.delete(id);
  }
}
