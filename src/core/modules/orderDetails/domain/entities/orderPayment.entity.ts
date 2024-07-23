type methodType = 'CASH' | 'DEBIT' | 'CREDIT';
type paymentStatus = 'Approved' | 'Failed' | 'Pending';

export interface OrderPaymentEntity {
  method: methodType;
  paymentStatus: paymentStatus;
}
