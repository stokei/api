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
import { ActivityModel } from '@/models/activity.model';
import { FindAllActivitiesQuery } from '@/queries/implements/activities/find-all-activities.query';
import { CountActivitiesRepository } from '@/repositories/activities/count-activities';
import { FindAllActivitiesRepository } from '@/repositories/activities/find-all-activities';

@QueryHandler(FindAllActivitiesQuery)
export class FindAllActivitiesQueryHandler
  implements IQueryHandler<FindAllActivitiesQuery>
{
  constructor(
    private readonly findAllActivityRepository: FindAllActivitiesRepository,
    private readonly countActivitiesRepository: CountActivitiesRepository
  ) {}

  async execute(
    query: FindAllActivitiesQuery
  ): Promise<IPaginatedType<ActivityModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const activities = await this.findAllActivityRepository.execute(data);
    const totalCount = await this.countActivitiesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ActivityModel>().toPaginationList({
      items: activities,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllActivitiesQuery): FindAllActivitiesQuery {
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
