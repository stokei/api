import { ICommand } from '@nestjs/cqrs';

import { CreateSubscriptionDTO } from '@/dtos/subscriptions/create-subscription.dto';

export class CreateSubscriptionCommand
  implements ICommand, CreateSubscriptionDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateSubscriptionDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
