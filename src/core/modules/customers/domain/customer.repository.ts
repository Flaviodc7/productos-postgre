import { CustomerEntity } from './entities/customer.entity';
import { CustomerModel } from '@models/customer.model';

export interface CustomerRepository {
  create: (data: CustomerEntity) => Promise<CustomerModel>;
  findOneById(id: string): Promise<CustomerModel>;
  findAll(): Promise<CustomerModel[]>;
  update(category: CustomerModel, data: CustomerEntity): Promise<CustomerModel>;
  delete(id: string): Promise<any>;
}
