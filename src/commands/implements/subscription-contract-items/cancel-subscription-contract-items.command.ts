import { ICommand } from '@nestjs/cqrs';

import { CancelSubscriptionContractItemsDTO } from '@/dtos/subscription-contract-items/cancel-subscription-contract-items.dto';

export class CancelSubscriptionContractItemsCommand
  implements ICommand, CancelSubscriptionContractItemsDTO
{
  subscriptionContract?: string;
  updatedBy: string;

  constructor(data: CancelSubscriptionContractItemsDTO) {
    this.subscriptionContract = data.subscriptionContract;
    this.updatedBy = data.updatedBy;
  }
}
