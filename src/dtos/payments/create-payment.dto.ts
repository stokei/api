import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';

export interface CreatePaymentDTO {
  parent: string;
  payer: string;
  currency: string;
  feeAmount?: number;
  paymentGatewayType: PaymentGatewayType;
  paymentMethod?: string;
  stripeCheckoutSession?: string;
  totalAmount: number;
  subtotalAmount: number;
  app: string;
  createdBy: string;
}
