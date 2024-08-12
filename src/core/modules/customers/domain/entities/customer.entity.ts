import { OrderEntity } from "@orderDomain/entities/order.entity";

export interface CustomerEntity {
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
  orders: OrderEntity[];
}
