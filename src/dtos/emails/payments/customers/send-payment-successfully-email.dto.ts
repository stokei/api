import { PaymentModel } from '@/models/payment.model';

export interface SendPaymentsCustomersPaymentSuccessfullyEmailDTO {
  toAccount: string;
  payment: PaymentModel;
  app: string;
  createdBy: string;
}
