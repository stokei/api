import { ICommand } from '@nestjs/cqrs';

import { CreatePaymentDTO } from '@/dtos/payments/create-payment.dto';

export class CreatePaymentCommand implements ICommand, CreatePaymentDTO {
  parent: string;
  payer: string;
  currency: string;
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
    this.stripeCheckoutSession = data.stripeCheckoutSession;
    this.totalAmount = data.totalAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
