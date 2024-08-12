import { NotFoundException } from '@nestjs/common';
import {
  CreateOrderDetailsPayload,
  IOrderDetailsUseCase,
  UpdateOrderDetailsPayload,
} from './orderDetails.usecase.interface';
import { OrderDetailsRepository } from '@orderDetailsDomain/orderDetails.repository';
import { OrderDetailsValue } from '@orderDetailsDomain/orderDetails.value';
import { OrderDetailsModel } from '@models/orderDetails/orderDetails.model';
import { ProductUseCase } from '@productApplication/product.usecase';

export class OrderDetailsUseCase implements IOrderDetailsUseCase {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
    private readonly productsUseCase: ProductUseCase,
  ) {}

  async create(payload: CreateOrderDetailsPayload): Promise<OrderDetailsModel> {
    const orderDetailsValue = new OrderDetailsValue().create(payload);

    await this.productsUseCase.updateStockOrder(payload.products);

    return await this.orderDetailsRepository.create(orderDetailsValue);
  }

  async findOneById(id: string): Promise<OrderDetailsModel> {
    const order = await this.orderDetailsRepository.findOneById(id);

    if (!order) {
      throw new NotFoundException(`Order Detail #${id} not found`);
    }

    return order;
  }

  async findByIds(ids: string[]): Promise<OrderDetailsModel[]> {
    return await this.orderDetailsRepository.findByIds(ids);
  }

  async update(payload: UpdateOrderDetailsPayload): Promise<OrderDetailsModel> {
    const { id } = payload;

    const orderDetails = await this.findOneById(id);

    if (!orderDetails) {
      throw new NotFoundException(`Order Detail #${id} not found`);
    }

    const updatedOrderDetailsValue = new OrderDetailsValue().update(
      orderDetails,
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
      throw new NotFoundException(`Product #${id} not found`);
    }

    return result;
  }
}
