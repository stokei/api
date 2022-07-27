import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { PlanMapper } from '@/mappers/plans';
import { PlanModel } from '@/models/plan.model';
import { FindAllPlansQuery } from '@/queries/implements/plans/find-all-plans.query';
import { CountPlansRepository } from '@/repositories/plans/count-plans';
import { FindAllPlansRepository } from '@/repositories/plans/find-all-plans';

@QueryHandler(FindAllPlansQuery)
export class FindAllPlansQueryHandler
  implements IQueryHandler<FindAllPlansQuery>
{
  constructor(
    private readonly findAllPlanRepository: FindAllPlansRepository,
    private readonly countPlansRepository: CountPlansRepository
  ) {}

  async execute(query: FindAllPlansQuery): Promise<IPaginatedType<PlanModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new PlanMapper().toFindAllQueryClean(query);
    const plans = await this.findAllPlanRepository.execute(data);
    const totalCount = await this.countPlansRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PlanModel>().toPaginationList({
      items: plans,
      page: data.page,
      totalCount
    });
  }
}
