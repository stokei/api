import { SubscriptionContractModel } from '@/models/subscription-contract.model';

interface IDataSubscriptionContractUpdatedEvent {
  readonly updatedBy: string;
  readonly subscriptionContract: SubscriptionContractModel;
}

export class SubscriptionContractUpdatedEvent {
  readonly updatedBy: string;
  readonly subscriptionContract: SubscriptionContractModel;

  constructor(data: IDataSubscriptionContractUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.subscriptionContract = data.subscriptionContract;
  }
}
