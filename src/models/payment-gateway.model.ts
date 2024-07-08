import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export interface IPaymentGatewayModelData {
  readonly type: PaymentGatewayType;
}

export class PaymentGatewayModel {
  readonly type: PaymentGatewayType;
  readonly paymentMethods: PaymentMethodType[];

  constructor(data: IPaymentGatewayModelData) {
    this.type = data.type;
    this.paymentMethods = this.getPaymentMethodByType();
  }

  private getPaymentMethodByType() {
    const gateways: Record<PaymentGatewayType, PaymentMethodType[]> = {
      [PaymentGatewayType.MERCADOPAGO]: [
        PaymentMethodType.BOLETO,
        PaymentMethodType.CARD,
        PaymentMethodType.PIX
      ],
      STRIPE: [PaymentMethodType.BOLETO, PaymentMethodType.CARD],
      PAGARME: [
        PaymentMethodType.BOLETO,
        PaymentMethodType.CARD,
        PaymentMethodType.PIX
      ],
      PAGSEGURO: [
        PaymentMethodType.BOLETO,
        PaymentMethodType.CARD,
        PaymentMethodType.PIX
      ]
    };

    return gateways[this.type];
  }
}
