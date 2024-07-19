import { SubscriptionContractModel } from '@/models/subscription-contract.model';

interface IDataSubscriptionContractExpiredEvent {
  readonly updatedBy: string;
  readonly subscriptionContract: SubscriptionContractModel;
}

export class SubscriptionContractExpiredEvent {
  readonly updatedBy: string;
  readonly subscriptionContract: SubscriptionContractModel;

  constructor(data: IDataSubscriptionContractExpiredEvent) {
    this.updatedBy = data.updatedBy;
    this.subscriptionContract = data.subscriptionContract;
  }
}
