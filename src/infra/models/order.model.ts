import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { OrderDetailsModel } from './orderDetails/orderDetails.model';

@Entity()
export class OrderModel {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToOne(() => OrderDetailsModel, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetailsModel[];
}
