import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderPaymentModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  method: string;

  @Column({ type: 'varchar', length: 255 })
  paymentStatus: string;
}
