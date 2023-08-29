import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface UpdatePaymentMethodDataDTO {
  lastFourCardNumber?: string;
  cardBrand?: string;
  cardExpiryMonth?: string;
  cardExpiryYear?: string;
  paymentMethodType?: PaymentMethodType;
  updatedBy: string;
}

export interface UpdatePaymentMethodWhereDTO {
  paymentMethod: string;
}

export interface UpdatePaymentMethodDTO {
  data: UpdatePaymentMethodDataDTO;
  where: UpdatePaymentMethodWhereDTO;
}
