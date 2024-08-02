import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OrderModel } from './order.model';

@Entity()
export class CustomerModel {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  surname: string;

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

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @OneToMany(() => OrderModel, (order) => order.customer)
  orders: OrderModel[];
}
