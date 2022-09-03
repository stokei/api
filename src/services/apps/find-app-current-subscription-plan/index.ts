import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { AppCurrentSubscriptionPlan } from '@/dtos/apps/app-current-subscription-plan.dto';
import { FindAppCurrentSubscriptionPlanQuery } from '@/queries/implements/apps/find-app-current-subscription-plan.query';

@Injectable()
export class FindAppCurrentSubscriptionPlanService
  implements IBaseService<string, Promise<AppCurrentSubscriptionPlan>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(appId: string): Promise<AppCurrentSubscriptionPlan> {
    return await this.queryBus.execute(
      new FindAppCurrentSubscriptionPlanQuery(appId)
    );
  }
}
