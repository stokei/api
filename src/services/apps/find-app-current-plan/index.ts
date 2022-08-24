import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PlanModel } from '@/models/plan.model';
import { FindAppCurrentPlanQuery } from '@/queries/implements/apps/find-app-current-plan.query';

@Injectable()
export class FindAppCurrentPlanService
  implements IBaseService<string, Promise<PlanModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(appId: string): Promise<PlanModel> {
    return await this.queryBus.execute(new FindAppCurrentPlanQuery(appId));
  }
}
