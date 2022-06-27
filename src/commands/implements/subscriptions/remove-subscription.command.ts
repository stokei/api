import { ICommand } from '@nestjs/cqrs';

import {
  RemoveSubscriptionDTO,
  RemoveSubscriptionWhereDTO
} from '@/dtos/subscriptions/remove-subscription.dto';

export class RemoveSubscriptionCommand
  implements ICommand, RemoveSubscriptionDTO
{
  where: RemoveSubscriptionWhereDTO;
  constructor(data: RemoveSubscriptionDTO) {
    this.where = data.where;
  }
}
