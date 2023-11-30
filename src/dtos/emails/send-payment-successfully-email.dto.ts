import { PaymentModel } from '@/models/payment.model';

export interface SendPaymentSuccessfullyEmailDTO {
  toAccount: string;
  payment: PaymentModel;
  app: string;
  createdBy: string;
}
