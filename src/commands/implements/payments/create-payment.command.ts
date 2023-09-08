import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentDTO } from '@/dtos/payments/create-payment.dto';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';

export class CreatePaymentCommand implements ICommand, CreatePaymentDTO {
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

  constructor(data: CreatePaymentDTO) {
    this.parent = data.parent;
    this.payer = data.payer;
    this.currency = data.currency;
    this.paymentMethod = data.paymentMethod;
    this.paymentGatewayType = data.paymentGatewayType;
    this.paymentMethodType = data.paymentMethodType;
    this.stripeCheckoutSession = data.stripeCheckoutSession;
    this.totalAmount = data.totalAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
