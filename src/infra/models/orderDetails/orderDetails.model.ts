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
import { PaymentDetailsModel } from './orderPayment.model';
import { ProductOrderModel } from './orderProduct.model';
import { OrderModel } from '../order.model';

@Entity()
export class OrderDetailsModel {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  orderId: string;

  @OneToOne(() => PaymentDetailsModel, { cascade: true, eager: true })
  @JoinColumn()
  paymentDetails: PaymentDetailsModel;

  @ManyToMany(() => ProductOrderModel, { cascade: true, eager: true })
  @JoinTable()
  productsOrder: ProductOrderModel[];

  @OneToOne(() => OrderDeliveryModel, { cascade: true, eager: true })
  @JoinColumn()
  delivery?: OrderDeliveryModel;

  @OneToOne(() => OrderModel, (order) => order.orderDetails)
  @JoinColumn()
  order: OrderModel;
}
