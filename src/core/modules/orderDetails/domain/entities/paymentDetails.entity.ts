export interface PaymentDetailsEntity {
  method: 'CASH' | 'DEBIT' | 'CREDIT';
  paymentStatus: 'Approved' | 'Failed' | 'Pending';
}
