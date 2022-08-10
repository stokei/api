import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PlanModel } from '@/models/plan.model';
import { FindDefaultPlanQuery } from '@/queries/implements/plans/find-default-plan.query';

@Injectable()
export class FindDefaultPlanService
  implements IBaseService<string, Promise<PlanModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(): Promise<PlanModel> {
    return await this.queryBus.execute(new FindDefaultPlanQuery());
  }
}
