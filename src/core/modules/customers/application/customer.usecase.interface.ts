import { CustomerModel } from '@models/customer.model';

export interface ICustomerUseCase {
  create: (payload: CreateCustomerPayload) => Promise<CustomerModel>;
  findOneById(id: string): Promise<CustomerModel>;
  findAll(): Promise<CustomerModel[]>;
  update(payload: UpdateCustomerPayload): Promise<CustomerModel>;
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
