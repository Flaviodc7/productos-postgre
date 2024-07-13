export interface PaymentDetails {
    method: 'CASH' | 'DEBIT' | 'CREDIT';
    paymentStatus: 'Approved' | 'Failed' | 'Pending';
    delivery: boolean;
  }
  