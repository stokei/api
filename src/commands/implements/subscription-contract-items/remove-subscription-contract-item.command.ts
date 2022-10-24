import { ICommand } from '@nestjs/cqrs';

import {
  RemoveSubscriptionContractItemDTO,
  RemoveSubscriptionContractItemWhereDTO
} from '@/dtos/subscription-contract-items/remove-subscription-contract-item.dto';

export class RemoveSubscriptionContractItemCommand
  implements ICommand, RemoveSubscriptionContractItemDTO
{
  where: RemoveSubscriptionContractItemWhereDTO;
  constructor(data: RemoveSubscriptionContractItemDTO) {
    this.where = data.where;
  }
}
