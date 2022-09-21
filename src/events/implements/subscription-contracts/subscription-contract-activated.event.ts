import { SubscriptionContractModel } from '@/models/subscription-contract.model';

interface IDataSubscriptionContractActivatedEvent {
  readonly updatedBy: string;
  readonly subscriptionContract: SubscriptionContractModel;
}

export class SubscriptionContractActivatedEvent {
  readonly updatedBy: string;
  readonly subscriptionContract: SubscriptionContractModel;

  constructor(data: IDataSubscriptionContractActivatedEvent) {
    this.updatedBy = data.updatedBy;
    this.subscriptionContract = data.subscriptionContract;
  }
}
