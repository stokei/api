import { ICommand } from '@nestjs/cqrs';

import { SendPaymentsCustomersPaymentErrorEmailDTO } from '@/dtos/emails/payments/customers/send-payment-error-email.dto';
import { PaymentModel } from '@/models/payment.model';

export class SendPaymentsCustomersPaymentErrorEmailCommand
  implements ICommand, SendPaymentsCustomersPaymentErrorEmailDTO
{
  toAccount: string;
  payment: PaymentModel;
  app: string;
  createdBy: string;

  constructor(data: SendPaymentsCustomersPaymentErrorEmailDTO) {
    this.toAccount = data.toAccount;
    this.payment = data.payment;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
