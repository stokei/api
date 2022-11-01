import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PlanType } from '@/enums/plan-type.enum';
import { PlanModel } from '@/models/plan.model';
import { FindPlanPriceByTypeQuery } from '@/queries/implements/plans/find-plan-price-by-type.query';

@Injectable()
export class FindPlanPriceByTypeService
  implements IBaseService<string, Promise<PlanModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: PlanType): Promise<PlanModel> {
    return await this.queryBus.execute(new FindPlanPriceByTypeQuery(data));
  }
}
