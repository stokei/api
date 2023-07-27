import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAppCurrentSubscriptionContractQuery } from '@/queries/implements/apps/find-app-current-subscription-contract.query';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAllSubscriptionContractsService } from '@/services/subscription-contracts/find-all-subscription-contracts';

@QueryHandler(FindAppCurrentSubscriptionContractQuery)
export class FindAppCurrentSubscriptionContractQueryHandler
  implements IQueryHandler<FindAppCurrentSubscriptionContractQuery>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAllSubscriptionContractsService: FindAllSubscriptionContractsService
  ) {}

  async execute(
    query: FindAppCurrentSubscriptionContractQuery
  ): Promise<SubscriptionContractModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const appId = cleanValue(query.app);
    if (!appId) {
      throw new ParamNotFoundException('appId');
    }

    const app = await this.findAppByIdService.execute(appId);
    if (!app) {
      throw new AppNotFoundException();
    }

    const subscriptionContracts =
      await this.findAllSubscriptionContractsService.execute({
        where: {
          AND: {
            parent: {
              equals: app.id
            },
            active: {
              equals: true
            }
          }
        },
        page: {
          limit: 1
        }
      });
    const currentAppSubscriptionContract =
      subscriptionContracts?.items?.length > 0 &&
      subscriptionContracts?.items[0];
    if (!currentAppSubscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }
    return currentAppSubscriptionContract;
  }
}
