import { SubscriptionModel } from '@/models/subscription.model';

interface IDataSubscriptionCreatedEvent {
  readonly subscription: SubscriptionModel;
}

export class SubscriptionCreatedEvent {
  readonly subscription: SubscriptionModel;

  constructor(data: IDataSubscriptionCreatedEvent) {
    this.subscription = data.subscription;
  }
}
