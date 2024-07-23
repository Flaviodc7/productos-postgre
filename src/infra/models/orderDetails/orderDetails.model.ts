import {
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { OrderDeliveryModel } from './orderDelivery.model';
import { OrderPaymentModel } from './orderPayment.model';
import { OrderProductModel } from './orderProduct.model';
import { OrderModel } from '../order.model';

@Entity()
export class OrderDetailsModel {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  orderId: string;

  @OneToOne(() => OrderPaymentModel, { cascade: true, eager: true })
  @JoinColumn()
  payment: OrderPaymentModel;

  @ManyToMany(() => OrderProductModel, { cascade: true, eager: true })
  @JoinTable()
  products: OrderProductModel[];

  @OneToOne(() => OrderDeliveryModel, { cascade: true, eager: true })
  @JoinColumn()
  delivery?: OrderDeliveryModel;

  @OneToOne(() => OrderModel, (order) => order.orderDetails)
  @JoinColumn()
  order: OrderModel;
}
