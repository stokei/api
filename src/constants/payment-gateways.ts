import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentGatewayModel } from '@/models/payment-gateway.model';

export const allPaymentGateways: PaymentGatewayModel[] = [
  new PaymentGatewayModel({
    type: PaymentGatewayType.MERCADOPAGO
  }),
  new PaymentGatewayModel({
    type: PaymentGatewayType.PAGARME
  }),
  new PaymentGatewayModel({
    type: PaymentGatewayType.PAGSEGURO
  }),
  new PaymentGatewayModel({
    type: PaymentGatewayType.STRIPE
  })
];
