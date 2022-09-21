import { SubscriptionContractModel } from '@/models/subscription-contract.model';

interface IDataSubscriptionContractCanceledEvent {
  readonly updatedBy: string;
  readonly subscriptionContract: SubscriptionContractModel;
}

export class SubscriptionContractCanceledEvent {
  readonly updatedBy: string;
  readonly subscriptionContract: SubscriptionContractModel;

  constructor(data: IDataSubscriptionContractCanceledEvent) {
    this.updatedBy = data.updatedBy;
    this.subscriptionContract = data.subscriptionContract;
  }
}
