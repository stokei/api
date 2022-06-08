import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IOperator,
  IPaginatedType,
  PaginationMapper,
  cleanObject,
  cleanSortValue,
  cleanValueNumber,
  cleanWhereDataString,
  cleanWhereDataSearch,
  cleanValue,
  splitServiceId
} from '@stokei/nestjs';
import { DataNotFoundException } from '@/errors';
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

    const data = this.clearData(query);
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

  private clearData(query: FindAllPlansQuery): FindAllPlansQuery {
    if (!query) {
      return null;
    }
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataString(operatorData.parent),
          name: cleanWhereDataSearch(operatorData.name),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        name: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt)
      })
    };
  }
}
