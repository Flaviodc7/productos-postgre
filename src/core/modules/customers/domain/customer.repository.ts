import { CustomerEntity } from './entities/customer.entity';

export interface CustomerRepository {
  create: (data: CustomerEntity) => Promise<CustomerEntity>;
  findOneById(id: string): Promise<CustomerEntity>;
  findAll(): Promise<CustomerEntity[]>;
  update(
    category: CustomerEntity,
    data: CustomerEntity,
  ): Promise<CustomerEntity>;
  delete(id: string): Promise<any>;
}
