import { ICommand } from '@nestjs/cqrs';

import {
  UpdateSubscriptionContractItemDataDTO,
  UpdateSubscriptionContractItemDTO,
  UpdateSubscriptionContractItemWhereDTO
} from '@/dtos/subscription-contract-items/update-subscription-contract-item.dto';

export class UpdateSubscriptionContractItemCommand
  implements ICommand, UpdateSubscriptionContractItemDTO
{
  data: UpdateSubscriptionContractItemDataDTO;
  where: UpdateSubscriptionContractItemWhereDTO;
  constructor(data: UpdateSubscriptionContractItemDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
