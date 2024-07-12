import { AddressEntity } from './address.entity';

export interface CustomerEntity {
  id: string;
  name: string;
  surname: string;
  address: AddressEntity;
  ordersId: string[];
  telephone: string;
}
