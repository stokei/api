import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';

@Injectable({ scope: Scope.REQUEST })
export class SubscriptionContractItemsLoader {
  constructor(
    private readonly subscriptionContractItemsService: FindAllSubscriptionContractItemsService
  ) {}

  readonly findByIds = new DataLoader(
    async (subscriptionContractItemIds: string[]) => {
      const subscriptionContractItems =
        await this.subscriptionContractItemsService.execute({
          where: {
            AND: {
              ids: subscriptionContractItemIds
            }
          }
        });
      const subscriptionContractItemsMap = new Map(
        subscriptionContractItems?.items?.map((subscriptionContractItem) => [
          subscriptionContractItem.id,
          subscriptionContractItem
        ])
      );
      return subscriptionContractItemIds.map((subscriptionContractItemId) =>
        subscriptionContractItemsMap.get(subscriptionContractItemId)
      );
    }
  );
}
