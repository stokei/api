import { PaymentStatus } from '@/enums/payment-status.enum';

export interface ExistsPaymentsWhereDTO {
  customer?: string;
  order?: string;
  paymentMethod?: string;
  status?: PaymentStatus;
  oldStatus?: PaymentStatus;
}

export interface ExistsPaymentsDTO {
  where: ExistsPaymentsWhereDTO;
}
