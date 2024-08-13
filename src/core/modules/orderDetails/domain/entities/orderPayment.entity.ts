import {
  MethodType,
  PaymentStatus,
} from '@orderDetailsDomain/types/enum.types';

export interface OrderPaymentEntity {
  id: string;
  method: MethodType;
  paymentStatus: PaymentStatus;
}
