import { ICommand } from '@nestjs/cqrs';

import { SendSubscriptionsCustomersSubscriptionActivatedEmailDTO } from '@/dtos/emails/subscriptions/customers/send-subscription-activated-email.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export class SendSubscriptionsCustomersSubscriptionActivatedEmailCommand
  implements ICommand, SendSubscriptionsCustomersSubscriptionActivatedEmailDTO
{
  toAccount: string;
  subscriptionContract: SubscriptionContractModel;
  app: string;
  createdBy: string;

  constructor(data: SendSubscriptionsCustomersSubscriptionActivatedEmailDTO) {
    this.toAccount = data.toAccount;
    this.subscriptionContract = data.subscriptionContract;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
