import { ICommand } from '@nestjs/cqrs';

import { CreateSubscriptionContractDTO } from '@/dtos/subscription-contracts/create-subscription-contract.dto';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export class CreateSubscriptionContractCommand
  implements ICommand, CreateSubscriptionContractDTO
{
  app: string;
  parent: string;
  stripeSubscription: string;
  startAt?: string;
  endAt?: string;
  paymentMethod?: string;
  type: SubscriptionContractType;
  automaticRenew: boolean;
  createdBy: string;

  constructor(data: CreateSubscriptionContractDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.stripeSubscription = data.stripeSubscription;
    this.type = data.type;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
    this.paymentMethod = data.paymentMethod;
    this.automaticRenew = data.automaticRenew;
    this.createdBy = data.createdBy;
  }
}
