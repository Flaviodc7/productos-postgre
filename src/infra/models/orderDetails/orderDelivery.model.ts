import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderDeliveryModel {
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
