import { ICommand } from '@nestjs/cqrs';

import { SendForgotPasswordEmailDTO } from '@/dtos/emails/send-forgot-password-email.dto';

export class SendForgotPasswordEmailCommand
  implements ICommand, SendForgotPasswordEmailDTO
{
  toAccount: string;
  app: string;
  createdBy: string;

  constructor(data: SendForgotPasswordEmailDTO) {
    this.toAccount = data.toAccount;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
