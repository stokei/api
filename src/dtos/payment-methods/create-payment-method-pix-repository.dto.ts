import { PaymentMethodType } from '@/enums/payment-method-type.enum';

import { CreatePaymentMethodPixDTO } from './create-payment-method-pix.dto';

export interface CreatePaymentMethodPixRepositoryDTO
  extends CreatePaymentMethodPixDTO {
  paymentMethodType: PaymentMethodType;
}
