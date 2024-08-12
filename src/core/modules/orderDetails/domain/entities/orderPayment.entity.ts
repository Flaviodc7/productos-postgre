type methodType = 'CASH' | 'DEBIT' | 'CREDIT';
type paymentStatus = 'Approved' | 'Failed' | 'Pending';

export interface OrderPaymentEntity {
  id: string;
  method: methodType;
  paymentStatus: paymentStatus;
}
