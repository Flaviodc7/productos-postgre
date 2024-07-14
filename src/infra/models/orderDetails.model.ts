import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { OrderModel } from './order.model';

@Entity()
export class OrderDetailsModel {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToOne(() => OrderModel, (order) => order.orderDetails)
  order: OrderModel[];
}
