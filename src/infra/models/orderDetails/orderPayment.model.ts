import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  MethodType,
  PaymentStatus,
} from '@orderDetailsDomain/types/enum.types';
import { OrderPaymentEntity } from '@orderDetailsDomain/entities/orderPayment.entity';

@Entity()
export class OrderPaymentModel implements OrderPaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  method: MethodType;

  @Column({ type: 'varchar', length: 255 })
  paymentStatus: PaymentStatus;
}
