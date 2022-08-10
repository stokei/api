import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PlanNotFoundException
} from '@/errors';
import { PlanModel } from '@/models/plan.model';
import { FindAppCurrentPlanQuery } from '@/queries/implements/apps/find-app-current-plan.query';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindDefaultPlanService } from '@/services/plans/find-default-plan';
import { FindPlanByIdService } from '@/services/plans/find-plan-by-id';

@QueryHandler(FindAppCurrentPlanQuery)
export class FindAppCurrentPlanQueryHandler
  implements IQueryHandler<FindAppCurrentPlanQuery>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findPlanByIdService: FindPlanByIdService,
    private readonly findDefaultPlanService: FindDefaultPlanService
  ) {}

  async execute(query: FindAppCurrentPlanQuery): Promise<PlanModel> {
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
    let plan: PlanModel = null;
    if (app?.plan) {
      plan = await this.findPlanByIdService.execute(app?.plan);
    } else {
      plan = await this.findDefaultPlanService.execute();
    }
    if (!plan) {
      throw new PlanNotFoundException();
    }
    return plan;
  }
}
