import { ICommand } from '@nestjs/cqrs';

import { ActivateSubscriptionContractItemsDTO } from '@/dtos/subscription-contract-items/activate-subscription-contract-items.dto';

export class ActivateSubscriptionContractItemsCommand
  implements ICommand, ActivateSubscriptionContractItemsDTO
{
  subscriptionContract?: string;
  updatedBy: string;

  constructor(data: ActivateSubscriptionContractItemsDTO) {
    this.subscriptionContract = data.subscriptionContract;
    this.updatedBy = data.updatedBy;
  }
}
