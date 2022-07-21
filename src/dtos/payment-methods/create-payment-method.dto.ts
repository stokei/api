import { PaymentMethodProvider } from '@/enums/payment-method-provider.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface CreatePaymentMethodDTO {
  parent: string;
  type: PaymentMethodType;
  provider: PaymentMethodProvider;
  externalPaymentMethodId: string;
  createdBy: string;
}
