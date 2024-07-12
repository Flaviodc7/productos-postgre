export interface Payment {
  method: 'CASH' | 'DEBIT' | 'CREDIT';
  delivery: boolean;
}
