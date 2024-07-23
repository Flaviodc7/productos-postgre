import { Column, Entity } from 'typeorm';

@Entity()
export class OrderPaymentModel {
  @Column({ type: 'varchar', length: 255 })
  method: string;

  @Column({ type: 'varchar', length: 255 })
  paymentStatus: string;
}
