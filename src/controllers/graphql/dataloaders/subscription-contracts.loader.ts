import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllSubscriptionContractsService } from '@/services/subscription-contracts/find-all-subscription-contracts';

@Injectable({ scope: Scope.REQUEST })
export class SubscriptionContractsLoader {
  constructor(
    private readonly subscriptionContractsService: FindAllSubscriptionContractsService
  ) {}

  readonly findByIds = new DataLoader(
    async (subscriptionContractIds: string[]) => {
      const subscriptionContracts =
        await this.subscriptionContractsService.execute({
          where: {
            AND: {
              ids: subscriptionContractIds
            }
          }
        });
      const subscriptionContractsMap = new Map(
        subscriptionContracts?.items?.map((subscriptionContract) => [
          subscriptionContract.id,
          subscriptionContract
        ])
      );
      return subscriptionContractIds.map((subscriptionContractId) =>
        subscriptionContractsMap.get(subscriptionContractId)
      );
    }
  );
}
