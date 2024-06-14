import { ICommand } from '@nestjs/cqrs';

import { SendAuthCustomersAccountConfigurationPendingEmailDTO } from '@/dtos/emails/auth/customers/send-account-configuration-pending-email.dto';

export class SendAuthCustomersAccountConfigurationPendingEmailCommand
  implements ICommand, SendAuthCustomersAccountConfigurationPendingEmailDTO
{
  toAccount: string;
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
