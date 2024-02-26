import { PaymentMethodType } from '@/enums/payment-method-type.enum';

import { CreatePaymentMethodStripeDTO } from './create-payment-method-stripe.dto';

export interface CreatePaymentMethodStripeRepositoryDTO
  extends CreatePaymentMethodStripeDTO {
  paymentMethodType: PaymentMethodType;
}
