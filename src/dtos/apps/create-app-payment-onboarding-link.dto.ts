import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
export interface CreateAppPaymentOnboardingLinkDTO {
  paymentGatewayType: PaymentGatewayType;
  successURL: string;
  cancelURL: string;
  app: string;
  createdBy: string;
}
