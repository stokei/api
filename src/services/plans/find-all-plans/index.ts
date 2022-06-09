import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllPlansDTO } from '@/dtos/plans/find-all-plans.dto';
import { PlanModel } from '@/models/plan.model';
import { FindAllPlansQuery } from '@/queries/implements/plans/find-all-plans.query';

@Injectable()
export class FindAllPlansService
  implements IBaseService<FindAllPlansDTO, Promise<IPaginatedType<PlanModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllPlansDTO): Promise<IPaginatedType<PlanModel>> {
    return await this.queryBus.execute(new FindAllPlansQuery(data));
  }
}
