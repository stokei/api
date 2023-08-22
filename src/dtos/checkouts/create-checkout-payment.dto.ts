import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface CreateCheckoutDTO {
  paymentMethodType: PaymentMethodType;
  app: string;
  customer: string;
  price: string;
  createdBy: string;
}
