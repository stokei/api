import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

interface IDataSubscriptionContractItemRemovedEvent {
  readonly removedBy: string;
  readonly subscriptionContractItem: SubscriptionContractItemModel;
}

export class SubscriptionContractItemRemovedEvent {
  readonly removedBy: string;
  readonly subscriptionContractItem: SubscriptionContractItemModel;

  constructor(data: IDataSubscriptionContractItemRemovedEvent) {
    this.removedBy = data.removedBy;
    this.subscriptionContractItem = data.subscriptionContractItem;
  }
}
