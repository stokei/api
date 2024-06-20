import { PaymentStatus } from '@/enums/payment-status.enum';

import { CreatePaymentDTO } from './create-payment.dto';

export interface CreatePaymentRepositoryDTO extends CreatePaymentDTO {
  status: PaymentStatus;
  active: boolean;
}
