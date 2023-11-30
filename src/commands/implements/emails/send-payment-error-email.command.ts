import { ICommand } from '@nestjs/cqrs';

import { SendPaymentErrorEmailDTO } from '@/dtos/emails/send-payment-error-email.dto';
import { PaymentModel } from '@/models/payment.model';

export class SendPaymentErrorEmailCommand
  implements ICommand, SendPaymentErrorEmailDTO
{
  toAccount: string;
  payment: PaymentModel;
  app: string;
  createdBy: string;

  constructor(data: SendPaymentErrorEmailDTO) {
    this.toAccount = data.toAccount;
    this.payment = data.payment;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
