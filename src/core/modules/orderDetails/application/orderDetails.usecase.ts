import logger from '@src/logger';
import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import {
  CreateOrderDetailsPayload,
  IOrderDetailsUseCase,
  UpdateOrderDetailsPayload,
} from './orderDetails.usecase.interface';
import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';
import { OrderDetailsRepository } from '@orderDetailsDomain/orderDetails.repository';
import { OrderDetailsValue } from '@orderDetailsDomain/orderDetails.value';
import { ProductUseCase } from '@productApplication/product.usecase';
import { OrderUseCase } from '@orderApplication/order.usecase';

export class OrderDetailsUseCase implements IOrderDetailsUseCase {
  constructor(
    @Inject('OrderDetailsRepository')
    private readonly orderDetailsRepository: OrderDetailsRepository,
    @Inject(forwardRef(() => OrderUseCase))
    private readonly orderUseCase: OrderUseCase,
    private readonly productsUseCase: ProductUseCase,
  ) {}

  async create(
    payload: CreateOrderDetailsPayload,
  ): Promise<OrderDetailsEntity> {
    const orderDetailsValue = new OrderDetailsValue().create(payload);

    await this.productsUseCase.updateStockOrder(payload.products);

    return await this.orderDetailsRepository.create(orderDetailsValue);
  }

  async findOneById(id: string): Promise<OrderDetailsEntity> {
    const order = await this.orderDetailsRepository.findOneById(id);

    if (!order) {
      logger.log('error', `GET /order-details/:orderDetailsId: Order Detail #${id} not found`);
      throw new NotFoundException(`Order Detail #${id} not found`);
    }

    return order;
  }

  async findByIds(ids: string[]): Promise<OrderDetailsEntity[]> {
    return await this.orderDetailsRepository.findByIds(ids);
  }

  async findAll(): Promise<OrderDetailsEntity[]> {
    return await this.orderDetailsRepository.findAll();
  }

  async update(
    payload: UpdateOrderDetailsPayload,
  ): Promise<OrderDetailsEntity> {
    const { id, orderId } = payload;

    const orderDetails = await this.findOneById(id);

    if (!orderDetails) {
      logger.log('error', `PUT /order-details/: Order Detail #${id} not found`);
      throw new NotFoundException(`Order Detail #${id} not found`);
    }

    const order = await this.orderUseCase.findOneById(orderId);

    if (!order) {
      logger.log('error', `GET /order/:orderId: Order #${id} not found`);
      throw new NotFoundException(`Order #${id} not found`);
    }

    const updatedOrderDetailsValue = new OrderDetailsValue().update(
      orderDetails,
      order,
      payload,
    );

    return await this.orderDetailsRepository.update(
      orderDetails,
      updatedOrderDetailsValue,
    );
  }

  async delete(id: string) {
    const result = await this.orderDetailsRepository.delete(id);

    if (result.affected === 0) {
      logger.log('error', `DELETE /order-details/:productId: Order Detail #${id} not found`);
      throw new NotFoundException(`Product #${id} not found`);
    }

    return result;
  }
}
