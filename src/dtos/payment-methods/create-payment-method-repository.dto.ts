import { PaymentMethodProvider } from '@/enums/payment-method-provider.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

import { CreatePaymentMethodDTO } from './create-payment-method.dto';

export interface CreatePaymentMethodRepositoryDTO
  extends CreatePaymentMethodDTO {
  type: PaymentMethodType;
  provider: PaymentMethodProvider;
  stripePaymentMethod: string;
  lastFourCardNumber?: string;
  cardBrand?: string;
}
