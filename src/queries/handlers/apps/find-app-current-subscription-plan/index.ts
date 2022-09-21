import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import { AppCurrentSubscriptionPlan } from '@/dtos/apps/app-current-subscription-plan.dto';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAppCurrentSubscriptionPlanQuery } from '@/queries/implements/apps/find-app-current-subscription-plan.query';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindPlanByIdService } from '@/services/plans/find-plan-by-id';
import { FindAllSubscriptionContractsService } from '@/services/subscription-contracts/find-all-subscription-contracts';

@QueryHandler(FindAppCurrentSubscriptionPlanQuery)
export class FindAppCurrentSubscriptionPlanQueryHandler
  implements IQueryHandler<FindAppCurrentSubscriptionPlanQuery>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findPlanByIdService: FindPlanByIdService,
    private readonly findAllSubscriptionContractsService: FindAllSubscriptionContractsService
  ) {}

  async execute(
    query: FindAppCurrentSubscriptionPlanQuery
  ): Promise<AppCurrentSubscriptionPlan> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const appId = cleanValue(query.appId);
    if (!appId) {
      throw new ParamNotFoundException('appId');
    }
    const app = await this.findAppByIdService.execute(appId);
    if (!app) {
      throw new AppNotFoundException();
    }
    const subscriptions =
      await this.findAllSubscriptionContractsService.execute({
        where: {
          AND: {
            parent: {
              equals: app.id
            },
            product: {
              search: ServerStokeiApiIdPrefix.PLANS
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        page: {
          limit: 1
        }
      });
    const currentSubscriptionPlan =
      subscriptions?.items?.length > 0 && subscriptions?.items[0];

    if (!currentSubscriptionPlan) {
      return null;
    }
    const plan = await this.findPlanByIdService.execute(
      currentSubscriptionPlan.product
    );
    return {
      subscription: currentSubscriptionPlan,
      plan
    };
  }
}
