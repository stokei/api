import { ICommand } from '@nestjs/cqrs';

import { ActivateSubscriptionContractDTO } from '@/dtos/subscription-contracts/activate-subscription-contract.dto';

export class ActivateSubscriptionContractCommand
  implements ICommand, ActivateSubscriptionContractDTO
{
  subscriptionContract: string;
  app: string;
  updatedBy: string;
  constructor(data: ActivateSubscriptionContractDTO) {
    this.subscriptionContract = data.subscriptionContract;
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}
