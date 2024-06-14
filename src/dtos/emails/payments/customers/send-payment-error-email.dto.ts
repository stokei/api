import { PaymentModel } from '@/models/payment.model';

export interface SendPaymentsCustomersPaymentErrorEmailDTO {
  toAccount: string;
  payment: PaymentModel;
  app: string;
  createdBy: string;
}
