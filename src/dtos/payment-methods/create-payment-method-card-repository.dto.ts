import { PaymentMethodType } from '@/enums/payment-method-type.enum';

import { CreatePaymentMethodCardDTO } from './create-payment-method-card.dto';

export interface CreatePaymentMethodCardRepositoryDTO
  extends CreatePaymentMethodCardDTO {
  paymentMethodType: PaymentMethodType;
}
