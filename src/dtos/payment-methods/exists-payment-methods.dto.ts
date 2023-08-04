import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface ExistsPaymentMethodsWhereDTO {
  app?: string;
  parent?: string;
  cardBrand?: string;
  cardExpiryMonth?: string;
  cardExpiryYear?: string;
  lastFourCardNumber?: string;
  stripePaymentMethod?: string;
  paymentMethodType?: PaymentMethodType;
}

export interface ExistsPaymentMethodsDTO {
  where: ExistsPaymentMethodsWhereDTO;
}
