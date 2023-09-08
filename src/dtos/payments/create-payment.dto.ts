import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface CreatePaymentDTO {
  parent: string;
  payer: string;
  currency: string;
  paymentGatewayType: PaymentGatewayType;
  paymentMethodType: PaymentMethodType;
  paymentMethod?: string;
  stripeCheckoutSession?: string;
  totalAmount: number;
  subtotalAmount: number;
  app: string;
  createdBy: string;
}
