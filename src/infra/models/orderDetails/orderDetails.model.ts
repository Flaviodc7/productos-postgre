import {
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderDeliveryModel } from './orderDelivery.model';
import { OrderPaymentModel } from './orderPayment.model';
import { OrderProductModel } from './orderProduct.model';
import { OrderAuditModel } from './orderAudit.model';
import { OrderModel } from '../order.model';
import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';

@Entity()
export class OrderDetailsModel implements OrderDetailsEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  orderId: string;

  @OneToMany(() => OrderAuditModel, (audit) => audit.orderDetails, {
    cascade: true,
    eager: true,
  })
  audit: OrderAuditModel[];

  @OneToOne(() => OrderPaymentModel, { cascade: true, eager: true })
  @JoinColumn()
  payment: OrderPaymentModel;

  @OneToMany(() => OrderProductModel, (product) => product.orderDetails, {
    cascade: true,
    eager: true,
  })
  products: OrderProductModel[];

  @OneToOne(() => OrderDeliveryModel, { cascade: true, eager: true })
  @JoinColumn()
  delivery?: OrderDeliveryModel;

  @OneToOne(() => OrderModel, (order) => order.orderDetails)
  @JoinColumn()
  order: OrderModel;
}
