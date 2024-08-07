import { ICommand } from '@nestjs/cqrs';

import { ChangePaymentToPaidDTO } from '@/dtos/payments/change-payment-to-paid.dto';

export class ChangePaymentToPaidCommand
  implements ICommand, ChangePaymentToPaidDTO
{
  payment: string;
  paymentMethod: string;
  stripeCheckoutSession?: string;
  updatedBy: string;

  constructor(data: ChangePaymentToPaidDTO) {
    this.payment = data.payment;
    this.paymentMethod = data.paymentMethod;
    this.stripeCheckoutSession = data.stripeCheckoutSession;
    this.updatedBy = data.updatedBy;
  }
}
