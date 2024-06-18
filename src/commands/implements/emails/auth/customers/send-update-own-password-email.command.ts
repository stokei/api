import { ICommand } from '@nestjs/cqrs';

import { SendAuthCustomersUpdateOwnPasswordEmailDTO } from '@/dtos/emails/auth/customers/send-update-own-password-email.dto';
import { AccountModel } from '@/models/account.model';

export class SendAuthCustomersUpdateOwnPasswordEmailCommand
  implements ICommand, SendAuthCustomersUpdateOwnPasswordEmailDTO
{
  toAccount: AccountModel;
  app: string;
  createdBy: string;

  constructor(data: SendAuthCustomersUpdateOwnPasswordEmailDTO) {
    this.toAccount = data.toAccount;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
