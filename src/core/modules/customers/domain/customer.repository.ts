import { CustomerEntity } from './entities/customer.entity';

export interface CustomerRepository {
  create: (customer: CustomerEntity) => Promise<CustomerEntity>;
  findOneById(id: string): Promise<CustomerEntity>;
  findAll(): Promise<CustomerEntity[]>;
  update(customer: CustomerEntity): Promise<CustomerEntity>;
  delete(id: string): Promise<any>;
}
