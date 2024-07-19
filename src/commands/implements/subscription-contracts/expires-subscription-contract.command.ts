import { ICommand } from '@nestjs/cqrs';

import { ExpiresSubscriptionContractDTO } from '@/dtos/subscription-contracts/expires-subscription-contract.dto';

export class ExpiresSubscriptionContractCommand
  implements ICommand, ExpiresSubscriptionContractDTO
{
  subscriptionContract: string;
  app: string;
  updatedBy: string;
  constructor(data: ExpiresSubscriptionContractDTO) {
    this.subscriptionContract = data.subscriptionContract;
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}
