import { CustomerEntity } from '@customersDomain/entities/customer.entity';

export interface ICustomerUseCase {
  create: (payload: CreateCustomerPayload) => Promise<CustomerEntity>;
  findOneById(id: string): Promise<CustomerEntity>;
  findAll(): Promise<CustomerEntity[]>;
  update(payload: UpdateCustomerPayload): Promise<CustomerEntity>;
  delete(id: string): Promise<any>;
}

export interface CreateCustomerPayload {
  id: string;
  name: string;
  surname: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  email: string;
  phone: string;
}

export interface UpdateCustomerPayload extends CreateCustomerPayload {}
