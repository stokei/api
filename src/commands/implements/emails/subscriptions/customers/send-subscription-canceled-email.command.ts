import { ICommand } from '@nestjs/cqrs';

import { SendSubscriptionsCustomersSubscriptionCanceledEmailDTO } from '@/dtos/emails/subscriptions/customers/send-subscription-canceled-email.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export class SendSubscriptionsCustomersSubscriptionCanceledEmailCommand
  implements ICommand, SendSubscriptionsCustomersSubscriptionCanceledEmailDTO
{
  toAccount: string;
  subscriptionContract: SubscriptionContractModel;
  app: string;
  createdBy: string;

  constructor(data: SendSubscriptionsCustomersSubscriptionCanceledEmailDTO) {
    this.toAccount = data.toAccount;
    this.subscriptionContract = data.subscriptionContract;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
