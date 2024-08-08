import { NotFoundException } from '@nestjs/common';
import {
  CreateCustomerPayload,
  ICustomerUseCase,
  UpdateCustomerPayload,
} from './customer.usecase.interface';
import { CustomerRepository } from '@customersDomain/customer.repository';
import { CustomerValue } from '@customersDomain/customer.value';
import { CustomerModel } from '@models/customer.model';

export class CustomerUseCase implements ICustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(payload: CreateCustomerPayload): Promise<CustomerModel> {
    const customerValue = new CustomerValue().create(payload);

    return await this.customerRepository.create(customerValue);
  }

  async findOneById(id: string): Promise<CustomerModel> {
    const customer = await this.customerRepository.findOneById(id);

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return customer;
  }

  async findAll(): Promise<CustomerModel[]> {
    return await this.customerRepository.findAll();
  }

  async update(payload: UpdateCustomerPayload): Promise<CustomerModel> {
    const { id } = payload;

    const customer = (await this.findOneById(id)) as CustomerModel;

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return await this.customerRepository.update(customer, payload);
  }

  async delete(id: string) {
    const result = await this.customerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return result;
  }
}
