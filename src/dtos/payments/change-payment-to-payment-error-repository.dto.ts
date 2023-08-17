import { PaymentStatus } from '@/enums/payment-status.enum';

export interface ChangePaymentToPaymentErrorRepositoryDataDTO {
  status: PaymentStatus;
  active: boolean;
  paymentErrorAt: string;
  paymentMethod: string;
  updatedBy: string;
}

export interface ChangePaymentToPaymentErrorRepositoryWhereDTO {
  app: string;
  payment: string;
}

export interface ChangePaymentToPaymentErrorRepositoryDTO {
  data: ChangePaymentToPaymentErrorRepositoryDataDTO;
  where: ChangePaymentToPaymentErrorRepositoryWhereDTO;
}
