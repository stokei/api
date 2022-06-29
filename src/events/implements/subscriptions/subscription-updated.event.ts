import { SubscriptionModel } from '@/models/subscription.model';

interface IDataSubscriptionUpdatedEvent {
  readonly updatedBy: string;
  readonly subscription: SubscriptionModel;
}

export class SubscriptionUpdatedEvent {
  readonly updatedBy: string;
  readonly subscription: SubscriptionModel;

  constructor(data: IDataSubscriptionUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.subscription = data.subscription;
  }
}
