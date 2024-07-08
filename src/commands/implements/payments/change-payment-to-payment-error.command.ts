import { ICommand } from '@nestjs/cqrs';

import { ChangePaymentToPaymentErrorDTO } from '@/dtos/payments/change-payment-to-payment-error.dto';

export class ChangePaymentToPaymentErrorCommand
  implements ICommand, ChangePaymentToPaymentErrorDTO
{
  payment: string;
  paymentMethod: string;
  stripeCheckoutSession?: string;
  updatedBy: string;

  constructor(data: ChangePaymentToPaymentErrorDTO) {
    this.payment = data.payment;
    this.paymentMethod = data.paymentMethod;
    this.stripeCheckoutSession = data.stripeCheckoutSession;
    this.updatedBy = data.updatedBy;
  }
}
