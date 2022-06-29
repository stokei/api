import { SubscriptionModel } from '@/models/subscription.model';

interface IDataSubscriptionRemovedEvent {
  readonly removedBy: string;
  readonly subscription: SubscriptionModel;
}

export class SubscriptionRemovedEvent {
  readonly removedBy: string;
  readonly subscription: SubscriptionModel;

  constructor(data: IDataSubscriptionRemovedEvent) {
    this.removedBy = data.removedBy;
    this.subscription = data.subscription;
  }
}
