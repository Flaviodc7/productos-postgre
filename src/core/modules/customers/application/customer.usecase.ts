import logger from '@src/logger';
import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import {
  CreateCustomerPayload,
  ICustomerUseCase,
  UpdateCustomerPayload,
} from './customer.usecase.interface';
import { CustomerEntity } from '@customersDomain/entities/customer.entity';
import { CustomerRepository } from '@customersDomain/customer.repository';
import { CustomerValue } from '@customersDomain/customer.value';
import { OrderUseCase } from '@orderApplication/order.usecase';

export class CustomerUseCase implements ICustomerUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
    @Inject(forwardRef(() => OrderUseCase))
    private readonly orderUseCase: OrderUseCase,
  ) {}

  async create(payload: CreateCustomerPayload): Promise<CustomerEntity> {
    const customerValue = new CustomerValue().create(payload);

    return this.customerRepository.create(customerValue);
  }

  async findOneById(id: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOneById(id);

    if (!customer) {
      logger.log('error', `GET /customers/:customerId: Customer #${id} not found`);
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return customer;
  }

  async findAll(): Promise<CustomerEntity[]> {
    return await this.customerRepository.findAll();
  }

  async update(payload: UpdateCustomerPayload): Promise<CustomerEntity> {
    const { ordersId } = payload;

    await this.findOneById(payload.id);

    const orders = await this.orderUseCase.findByIds(ordersId);

    const customerValue = new CustomerValue().update(payload, orders);

    return await this.customerRepository.update(customerValue);
  }

  async delete(id: string) {
    const result = await this.customerRepository.delete(id);

    if (result.affected === 0) {
      logger.log('error', `DELETE /customers/:customerId: Customer #${id} not found`);
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return result;
  }
}
