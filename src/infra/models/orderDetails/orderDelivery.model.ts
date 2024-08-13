import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDeliveryEntity } from '@orderDetailsDomain/entities/orderDelivery.entity';

@Entity()
export class OrderDeliveryModel implements OrderDeliveryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  postalCode: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;
}
