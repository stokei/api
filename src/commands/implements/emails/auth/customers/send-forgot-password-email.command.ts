import { ICommand } from '@nestjs/cqrs';

import { SendAuthCustomersForgotPasswordEmailDTO } from '@/dtos/emails/auth/customers/send-forgot-password-email.dto';
import { AccountModel } from '@/models/account.model';

export class SendAuthCustomersForgotPasswordEmailCommand
  implements ICommand, SendAuthCustomersForgotPasswordEmailDTO
{
  toAccount: AccountModel;
  app: string;
  createdBy: string;

  constructor(data: SendAuthCustomersForgotPasswordEmailDTO) {
    this.toAccount = data.toAccount;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
