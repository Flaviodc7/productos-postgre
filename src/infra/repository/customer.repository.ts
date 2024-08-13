import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerRepository } from '@customersDomain/customer.repository';
import { CustomerEntity } from '@customersDomain/entities/customer.entity';
import { CustomerModel } from '@models/customer.model';

@Injectable()
export class CustomerPostgreRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerModel)
    private customerRepository: Repository<CustomerModel>,
  ) {}

  async findAll(): Promise<CustomerEntity[]> {
    return await this.customerRepository.find();
  }

  async findOneById(id: string): Promise<CustomerEntity> {
    return await this.customerRepository.findOne({
      where: { id: id },
    });
  }

  async create(payload: CustomerEntity): Promise<CustomerEntity> {
    const newCustomer = this.customerRepository.create(payload);

    return await this.customerRepository.save(newCustomer);
  }

  async update(
    customer: CustomerEntity,
    payload: CustomerEntity,
  ): Promise<CustomerEntity> {
    this.customerRepository.merge(customer, payload);
    return await this.customerRepository.save(customer);
  }

  async delete(id: string): Promise<any> {
    return await this.customerRepository.delete(id);
  }
}
