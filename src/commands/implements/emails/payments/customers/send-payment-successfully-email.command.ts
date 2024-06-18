import { ICommand } from '@nestjs/cqrs';

import { SendPaymentsCustomersPaymentSuccessfullyEmailDTO } from '@/dtos/emails/payments/customers/send-payment-successfully-email.dto';
import { PaymentModel } from '@/models/payment.model';

export class SendPaymentsCustomersPaymentSuccessfullyEmailCommand
  implements ICommand, SendPaymentsCustomersPaymentSuccessfullyEmailDTO
{
  toAccount: string;
  payment: PaymentModel;
  app: string;
  createdBy: string;

  constructor(data: SendPaymentsCustomersPaymentSuccessfullyEmailDTO) {
    this.toAccount = data.toAccount;
    this.payment = data.payment;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
