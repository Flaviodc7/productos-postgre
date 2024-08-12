import { OrderPaymentEntity } from '@orderDetailsDomain/entities/orderPayment.entity';
import { MethodType, PaymentStatus } from '@src/infra/utils/enum.types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderPaymentModel implements OrderPaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  method: MethodType;

  @Column({ type: 'varchar', length: 255 })
  paymentStatus: PaymentStatus;
}
