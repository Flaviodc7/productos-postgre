import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { OrderStatus } from '@orderDomain/entities/orderStatus.entity';
import { OrderDetailsModel } from './orderDetails/orderDetails.model';
import { OrderEntity } from '@orderDomain/entities/order.entity';
import { CustomerModel } from './customer.model';

@Entity()
export class OrderModel implements OrderEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'text' })
  createdAt: string;

  @Column({ type: 'text' })
  status: OrderStatus;

  @OneToOne(() => OrderDetailsModel, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetailsModel;

  @ManyToOne(() => CustomerModel, (customer) => customer.orders)
  customer: CustomerModel;
}
