import { ICommand } from '@nestjs/cqrs';

import { CreateSubscriptionContractDTO } from '@/dtos/subscription-contracts/create-subscription-contract.dto';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export class CreateSubscriptionContractCommand
  implements ICommand, CreateSubscriptionContractDTO
{
  parent: string;
  product: string;
  type: SubscriptionContractType;
  automaticRenew?: boolean;
  startAt?: string;
  endAt?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateSubscriptionContractDTO) {
    this.parent = data.parent;
    this.type = data.type;
    this.product = data.product;
    this.automaticRenew = data.automaticRenew;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
