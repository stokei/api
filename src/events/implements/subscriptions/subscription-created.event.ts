import { SubscriptionModel } from '@/models/subscription.model';

interface IDataSubscriptionCreatedEvent {
  readonly createdBy: string;
  readonly subscription: SubscriptionModel;
}

export class SubscriptionCreatedEvent {
  readonly createdBy: string;
  readonly subscription: SubscriptionModel;

  constructor(data: IDataSubscriptionCreatedEvent) {
    this.createdBy = data.createdBy;
    this.subscription = data.subscription;
  }
}
