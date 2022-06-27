import { ICommand } from '@nestjs/cqrs';

import {
  UpdateSubscriptionDataDTO,
  UpdateSubscriptionDTO,
  UpdateSubscriptionWhereDTO
} from '@/dtos/subscriptions/update-subscription.dto';

export class UpdateSubscriptionCommand
  implements ICommand, UpdateSubscriptionDTO
{
  data: UpdateSubscriptionDataDTO;
  where: UpdateSubscriptionWhereDTO;
  constructor(data: UpdateSubscriptionDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
