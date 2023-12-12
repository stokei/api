import { ICommand } from '@nestjs/cqrs';

import { SendSubscriptionCanceledEmailDTO } from '@/dtos/emails/send-subscription-canceled-email.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export class SendSubscriptionCanceledEmailCommand
  implements ICommand, SendSubscriptionCanceledEmailDTO
{
  toAccount: string;
  subscriptionContract: SubscriptionContractModel;
  app: string;
  createdBy: string;

  constructor(data: SendSubscriptionCanceledEmailDTO) {
    this.toAccount = data.toAccount;
    this.subscriptionContract = data.subscriptionContract;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
