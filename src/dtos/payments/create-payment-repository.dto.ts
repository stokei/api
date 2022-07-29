import { PaymentStatus } from '@/enums/payment-status.enum';

import { CreatePaymentDTO } from './create-payment.dto';

export interface CreatePaymentRepositoryDTO extends CreatePaymentDTO {
  externalPayment: string;
  amount: number;
  status: PaymentStatus;
}
