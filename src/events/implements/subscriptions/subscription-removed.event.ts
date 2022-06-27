import { SubscriptionModel } from '@/models/subscription.model';

interface IDataSubscriptionRemovedEvent {
  readonly subscription: SubscriptionModel;
}

export class SubscriptionRemovedEvent {
  readonly subscription: SubscriptionModel;

  constructor(data: IDataSubscriptionRemovedEvent) {
    this.subscription = data.subscription;
  }
}
