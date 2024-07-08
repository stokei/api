import { PaymentStatus } from '@/enums/payment-status.enum';

export interface ChangePaymentToPaymentErrorRepositoryDataDTO {
  status: PaymentStatus;
  active: boolean;
  stripeCheckoutSession?: string;
  paymentErrorAt: string;
  paymentMethod?: string;
  updatedBy: string;
}

export interface ChangePaymentToPaymentErrorRepositoryWhereDTO {
  payment: string;
}

export interface ChangePaymentToPaymentErrorRepositoryDTO {
  data: ChangePaymentToPaymentErrorRepositoryDataDTO;
  where: ChangePaymentToPaymentErrorRepositoryWhereDTO;
}
