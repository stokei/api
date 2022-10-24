import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

interface IDataSubscriptionContractItemUpdatedEvent {
  readonly updatedBy: string;
  readonly subscriptionContractItem: SubscriptionContractItemModel;
}

export class SubscriptionContractItemUpdatedEvent {
  readonly updatedBy: string;
  readonly subscriptionContractItem: SubscriptionContractItemModel;

  constructor(data: IDataSubscriptionContractItemUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.subscriptionContractItem = data.subscriptionContractItem;
  }
}
