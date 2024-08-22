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
    private orderDetailsRepository: Repository<OrderDetailsModel>,
  ) {}

  async findOneById(id: string): Promise<OrderDetailsEntity> {
    return await this.orderDetailsRepository.findOne({
      where: { id: id },
    });
  }

  async findByIds(ids: string[]): Promise<OrderDetailsEntity[]> {
    return await this.orderDetailsRepository.find({
      where: { id: In(ids) },
    });
  }

  async findAll(): Promise<OrderDetailsEntity[]> {
    return await this.orderDetailsRepository.find();
  }

  async create(payload: OrderDetailsEntity): Promise<OrderDetailsEntity> {
    const newOrder = this.orderDetailsRepository.create(payload);

    return await this.orderDetailsRepository.save(newOrder);
  }

  async update(
    orderDetails: OrderDetailsEntity,
    payload: OrderDetailsEntity,
  ): Promise<OrderDetailsEntity> {
    this.orderDetailsRepository.merge(orderDetails, payload);
    return await this.orderDetailsRepository.save(orderDetails);
  }

  async delete(id: string): Promise<any> {
    return await this.orderDetailsRepository.delete(id);
  }
}
