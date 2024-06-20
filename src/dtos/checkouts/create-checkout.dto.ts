import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
export interface CreateCheckoutDTO {
  successURL: string;
  cancelURL: string;
  paymentGatewayType: PaymentGatewayType;
  app: string;
  customer: string;
  order: string;
  createdBy: string;
}
