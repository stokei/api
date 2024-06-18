import { ICommand } from '@nestjs/cqrs';

import { SendAuthSellersNewMemberEmailDTO } from '@/dtos/emails/auth/sellers/send-new-member-email.dto';
import { AccountModel } from '@/models/account.model';

export class SendAuthSellersNewMemberEmailCommand
  implements ICommand, SendAuthSellersNewMemberEmailDTO
{
  account: AccountModel;
  app: string;
  createdBy: string;

  constructor(data: SendAuthSellersNewMemberEmailDTO) {
    this.account = data.account;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
