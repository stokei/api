import { SubscriptionModel } from '@/models/subscription.model';

interface IDataSubscriptionUpdatedEvent {
  readonly subscription: SubscriptionModel;
}

export class SubscriptionUpdatedEvent {
  readonly subscription: SubscriptionModel;

  constructor(data: IDataSubscriptionUpdatedEvent) {
    this.subscription = data.subscription;
  }
}
