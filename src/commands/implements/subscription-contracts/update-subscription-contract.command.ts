import { ICommand } from '@nestjs/cqrs';

import {
  UpdateSubscriptionContractDataDTO,
  UpdateSubscriptionContractDTO,
  UpdateSubscriptionContractWhereDTO
} from '@/dtos/subscription-contracts/update-subscription-contract.dto';

export class UpdateSubscriptionContractCommand
  implements ICommand, UpdateSubscriptionContractDTO
{
  data: UpdateSubscriptionContractDataDTO;
  where: UpdateSubscriptionContractWhereDTO;
  constructor(data: UpdateSubscriptionContractDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
