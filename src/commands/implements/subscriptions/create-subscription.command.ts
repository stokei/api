import { ICommand } from '@nestjs/cqrs';

import { CreateSubscriptionDTO } from '@/dtos/subscriptions/create-subscription.dto';

export class CreateSubscriptionCommand
  implements ICommand, CreateSubscriptionDTO
{
  parent: string;
  product: string;
  automaticRenew?: boolean;
  startAt?: string;
  endAt?: string;
  createdBy: string;

  constructor(data: CreateSubscriptionDTO) {
    this.parent = data.parent;
    this.product = data.product;
    this.automaticRenew = data.automaticRenew;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
    this.createdBy = data.createdBy;
  }
}
