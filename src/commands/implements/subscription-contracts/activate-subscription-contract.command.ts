import { ICommand } from '@nestjs/cqrs';

import { ActivateSubscriptionContractDTO } from '@/dtos/subscription-contracts/activate-subscription-contract.dto';

export class ActivateSubscriptionContractCommand
  implements ICommand, ActivateSubscriptionContractDTO
{
  subscriptionContract: string;
  paymentMethod: string;
  app: string;
  startAt: string;
  endAt: string;
  updatedBy: string;
  constructor(data: ActivateSubscriptionContractDTO) {
    this.subscriptionContract = data.subscriptionContract;
    this.paymentMethod = data.paymentMethod;
    this.app = data.app;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
    this.updatedBy = data.updatedBy;
  }
}
