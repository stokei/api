import { ICommand } from '@nestjs/cqrs';

import { CancelSubscriptionContractDTO } from '@/dtos/subscription-contracts/cancel-subscription-contract.dto';

export class CancelSubscriptionContractCommand
  implements ICommand, CancelSubscriptionContractDTO
{
  subscriptionContract: string;
  app: string;
  updatedBy: string;
  constructor(data: CancelSubscriptionContractDTO) {
    this.subscriptionContract = data.subscriptionContract;
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}
