import { ICommand } from '@nestjs/cqrs';

import { SendSubscriptionActivatedEmailDTO } from '@/dtos/emails/send-subscription-activated-email.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export class SendSubscriptionActivatedEmailCommand
  implements ICommand, SendSubscriptionActivatedEmailDTO
{
  toAccount: string;
  subscriptionContract: SubscriptionContractModel;
  app: string;
  createdBy: string;

  constructor(data: SendSubscriptionActivatedEmailDTO) {
    this.toAccount = data.toAccount;
    this.subscriptionContract = data.subscriptionContract;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
