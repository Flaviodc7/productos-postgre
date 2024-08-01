import { CreateCustomerPayload } from '@customersApplication/customer.usecase.interface';
import { CustomerEntity } from './entities/customer.entity';

export class CustomerValue {
  public create = (customerPayload: CreateCustomerPayload): CustomerEntity => {
    return {
      ...customerPayload,
    };
  };
}
