import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProductEntity } from '@orderDetailsDomain/entities/orderProduct.entity';
import { OrderDetailsModel } from './orderDetails.model';

@Entity()
export class OrderProductModel implements OrderProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => OrderDetailsModel, (orderDetails) => orderDetails.products)
  details: OrderDetailsModel;
}
