import { ICommand } from '@nestjs/cqrs';

import { SendUpdateOwnPasswordEmailDTO } from '@/dtos/emails/send-update-own-password-email.dto';

export class SendUpdateOwnPasswordEmailCommand
  implements ICommand, SendUpdateOwnPasswordEmailDTO
{
  toAccount: string;
  app: string;
  createdBy: string;

  constructor(data: SendUpdateOwnPasswordEmailDTO) {
    this.toAccount = data.toAccount;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
