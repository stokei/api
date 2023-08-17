import { ICommand } from '@nestjs/cqrs';

import { ChangePaymentToPaymentErrorDTO } from '@/dtos/payments/change-payment-to-payment-error.dto';

export class ChangePaymentToPaymentErrorCommand
  implements ICommand, ChangePaymentToPaymentErrorDTO
{
  app: string;
  payment: string;
  paymentUrl: string;
  paymentMethod: string;
  updatedBy: string;

  constructor(data: ChangePaymentToPaymentErrorDTO) {
    this.app = data.app;
    this.payment = data.payment;
    this.paymentUrl = data.paymentUrl;
    this.paymentMethod = data.paymentMethod;
    this.updatedBy = data.updatedBy;
  }
}
