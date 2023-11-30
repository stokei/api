import { PaymentModel } from '@/models/payment.model';

export interface SendPaymentErrorEmailDTO {
  toAccount: string;
  payment: PaymentModel;
  app: string;
  createdBy: string;
}
