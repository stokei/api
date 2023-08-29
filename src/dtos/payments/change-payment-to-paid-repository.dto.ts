import { PaymentStatus } from '@/enums/payment-status.enum';

export interface ChangePaymentToPaidRepositoryDataDTO {
  status: PaymentStatus;
  active: boolean;
  stripeCheckoutSession?: string;
  paidAt: string;
  paymentMethod?: string;
  updatedBy: string;
}

export interface ChangePaymentToPaidRepositoryWhereDTO {
  app: string;
  payment: string;
}

export interface ChangePaymentToPaidRepositoryDTO {
  data: ChangePaymentToPaidRepositoryDataDTO;
  where: ChangePaymentToPaidRepositoryWhereDTO;
}
