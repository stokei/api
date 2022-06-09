import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PlanModel } from '@/models/plan.model';
import { FindPlanByIdQuery } from '@/queries/implements/plans/find-plan-by-id.query';

@Injectable()
export class FindPlanByIdService
  implements IBaseService<string, Promise<PlanModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<PlanModel> {
    return await this.queryBus.execute(new FindPlanByIdQuery(data));
  }
}
