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
import { ProjectsPlanModel } from '@/models/projects-plan.model';
import { FindAllProjectsPlansQuery } from '@/queries/implements/projects-plans/find-all-projects-plans.query';
import { CountProjectsPlansRepository } from '@/repositories/projects-plans/count-projects-plans';
import { FindAllProjectsPlansRepository } from '@/repositories/projects-plans/find-all-projects-plans';

@QueryHandler(FindAllProjectsPlansQuery)
export class FindAllProjectsPlansQueryHandler
  implements IQueryHandler<FindAllProjectsPlansQuery>
{
  constructor(
    private readonly findAllProjectsPlanRepository: FindAllProjectsPlansRepository,
    private readonly countProjectsPlansRepository: CountProjectsPlansRepository
  ) {}

  async execute(
    query: FindAllProjectsPlansQuery
  ): Promise<IPaginatedType<ProjectsPlanModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const projectsPlans = await this.findAllProjectsPlanRepository.execute(
      data
    );
    const totalCount = await this.countProjectsPlansRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ProjectsPlanModel>().toPaginationList({
      items: projectsPlans,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllProjectsPlansQuery
  ): FindAllProjectsPlansQuery {
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
