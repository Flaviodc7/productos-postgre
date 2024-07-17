type methodType = 'CASH' | 'DEBIT' | 'CREDIT';
type paymentStatus = 'Approved' | 'Failed' | 'Pending';

export interface PaymentDetailsEntity {
  method: methodType;
  paymentStatus: paymentStatus;
}
