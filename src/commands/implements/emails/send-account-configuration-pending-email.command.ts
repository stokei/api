import { ICommand } from '@nestjs/cqrs';

import { SendAccountConfigurationPendingEmailDTO } from '@/dtos/emails/send-account-configuration-pending-email.dto';

export class SendAccountConfigurationPendingEmailCommand
  implements ICommand, SendAccountConfigurationPendingEmailDTO
{
  toAccount: string;
  plainTextPassword?: string;
  app: string;
  createdBy: string;

  constructor(data: SendAccountConfigurationPendingEmailDTO) {
    this.toAccount = data.toAccount;
    this.app = data.app;
    this.plainTextPassword = data.plainTextPassword;
    this.createdBy = data.createdBy;
  }
}
