import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

interface IDataSubscriptionContractItemCreatedEvent {
  readonly createdBy: string;
  readonly subscriptionContractItem: SubscriptionContractItemModel;
}

export class SubscriptionContractItemCreatedEvent {
  readonly createdBy: string;
  readonly subscriptionContractItem: SubscriptionContractItemModel;

  constructor(data: IDataSubscriptionContractItemCreatedEvent) {
    this.createdBy = data.createdBy;
    this.subscriptionContractItem = data.subscriptionContractItem;
  }
}
