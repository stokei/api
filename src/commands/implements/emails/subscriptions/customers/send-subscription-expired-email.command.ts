import { ICommand } from '@nestjs/cqrs';

import { SendSubscriptionsCustomersSubscriptionExpiredEmailDTO } from '@/dtos/emails/subscriptions/customers/send-subscription-expired-email.dto';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export class SendSubscriptionsCustomersSubscriptionExpiredEmailCommand
  implements ICommand, SendSubscriptionsCustomersSubscriptionExpiredEmailDTO
{
  toAccount: string;
  subscriptionContract: SubscriptionContractModel;
  app: string;
  createdBy: string;

  constructor(data: SendSubscriptionsCustomersSubscriptionExpiredEmailDTO) {
    this.toAccount = data.toAccount;
    this.subscriptionContract = data.subscriptionContract;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
