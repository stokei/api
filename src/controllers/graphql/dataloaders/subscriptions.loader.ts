import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllSubscriptionsService } from '@/services/subscriptions/find-all-subscriptions';

@Injectable({ scope: Scope.REQUEST })
export class SubscriptionsLoader {
  constructor(
    private readonly subscriptionsService: FindAllSubscriptionsService
  ) {}

  readonly findByIds = new DataLoader(async (subscriptionIds: string[]) => {
    const subscriptions = await this.subscriptionsService.execute({
      where: {
        AND: {
          ids: subscriptionIds
        }
      }
    });
    const subscriptionsMap = new Map(
      subscriptions?.items?.map((subscription) => [
        subscription.id,
        subscription
      ])
    );
    return subscriptionIds.map((subscriptionId) =>
      subscriptionsMap.get(subscriptionId)
    );
  });
}
