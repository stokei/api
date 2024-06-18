import { ICommand } from '@nestjs/cqrs';

import { SendAuthCustomersAccountConfigurationPendingEmailDTO } from '@/dtos/emails/auth/customers/send-account-configuration-pending-email.dto';
import { AccountModel } from '@/models/account.model';

export class SendAuthCustomersAccountConfigurationPendingEmailCommand
  implements ICommand, SendAuthCustomersAccountConfigurationPendingEmailDTO
{
  toAccount: AccountModel;
  plainTextPassword?: string;
  app: string;
  createdBy: string;

  constructor(data: SendAuthCustomersAccountConfigurationPendingEmailDTO) {
    this.toAccount = data.toAccount;
    this.app = data.app;
    this.plainTextPassword = data.plainTextPassword;
    this.createdBy = data.createdBy;
  }
}
