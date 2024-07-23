import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetailsModel } from './orderDetails.model';

@Entity()
export class OrderAuditModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  date: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  responsible: string;

  @ManyToOne(() => OrderDetailsModel, (orderDetails) => orderDetails.audit)
  orderDetails: OrderDetailsModel;
}
