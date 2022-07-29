import { SubscriptionContractModel } from '@/models/subscription-contract.model';

interface IDataSubscriptionContractCreatedEvent {
  readonly createdBy: string;
  readonly subscriptionContract: SubscriptionContractModel;
}

export class SubscriptionContractCreatedEvent {
  readonly createdBy: string;
  readonly subscriptionContract: SubscriptionContractModel;

  constructor(data: IDataSubscriptionContractCreatedEvent) {
    this.createdBy = data.createdBy;
    this.subscriptionContract = data.subscriptionContract;
  }
}
