import { ICommand } from '@nestjs/cqrs';

import { SendPaymentSuccessfullyEmailDTO } from '@/dtos/emails/send-payment-successfully-email.dto';
import { PaymentModel } from '@/models/payment.model';

export class SendPaymentSuccessfullyEmailCommand
  implements ICommand, SendPaymentSuccessfullyEmailDTO
{
  toAccount: string;
  payment: PaymentModel;
  app: string;
  createdBy: string;

  constructor(data: SendPaymentSuccessfullyEmailDTO) {
    this.toAccount = data.toAccount;
    this.payment = data.payment;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
