import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderAuditEntity } from '@orderDetailsDomain/entities/orderAudit.entity';
import { OrderDetailsModel } from './orderDetails.model';

@Entity()
export class OrderAuditModel implements OrderAuditEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
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
