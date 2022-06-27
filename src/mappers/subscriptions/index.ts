import { convertToISODateString } from '@stokei/nestjs';

import { SubscriptionEntity } from '@/entities';
import { SubscriptionModel } from '@/models/subscription.model';

export class SubscriptionMapper {
  toModel(subscription: SubscriptionEntity) {
    return (
      subscription &&
      new SubscriptionModel({
        ...subscription,
        updatedAt: convertToISODateString(subscription.updatedAt),
        createdAt: convertToISODateString(subscription.createdAt)
      })
    );
  }
  toModels(subscriptions: SubscriptionEntity[]) {
    return subscriptions?.length > 0
      ? subscriptions.map(this.toModel).filter(Boolean)
      : [];
  }
}
