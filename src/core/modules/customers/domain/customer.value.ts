import {
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from '@customersApplication/customer.usecase.interface';
import { CustomerEntity } from './entities/customer.entity';
import { OrderEntity } from '@orderDomain/entities/order.entity';

export class CustomerValue {
  public create = (
    customerPayload: CreateCustomerPayload,
    orders?: OrderEntity[],
  ): CustomerEntity => {
    return {
      ...customerPayload,
      orders,
    };
  };

  public update = (
    customerPayload: UpdateCustomerPayload,
    orders?: OrderEntity[],
  ): CustomerEntity => {
    return {
      ...customerPayload,
      orders,
    };
  };
}
