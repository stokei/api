import { PaymentMethodProvider } from '@/enums/payment-method-provider.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface ExistsPaymentMethodsWhereDTO {
  parent?: string;
  type?: PaymentMethodType;
  provider?: PaymentMethodProvider;
  externalPaymentMethod?: string;
}

export interface ExistsPaymentMethodsDTO {
  where: ExistsPaymentMethodsWhereDTO;
}
