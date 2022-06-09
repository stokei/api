import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IPaginatedType,
  PaginationMapper,
  splitServiceId
} from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ActivitiesActionModel } from '@/models/activities-action.model';
import { FindAllActivitiesActionsQuery } from '@/queries/implements/activities-actions/find-all-activities-actions.query';
import { CountActivitiesActionsRepository } from '@/repositories/activities-actions/count-activities-actions';
import { FindAllActivitiesActionsRepository } from '@/repositories/activities-actions/find-all-activities-actions';

@QueryHandler(FindAllActivitiesActionsQuery)
export class FindAllActivitiesActionsQueryHandler
  implements IQueryHandler<FindAllActivitiesActionsQuery>
{
  constructor(
    private readonly findAllActivitiesActionRepository: FindAllActivitiesActionsRepository,
    private readonly countActivitiesActionsRepository: CountActivitiesActionsRepository
  ) {}

  async execute(
    query: FindAllActivitiesActionsQuery
  ): Promise<IPaginatedType<ActivitiesActionModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const activitiesActions =
      await this.findAllActivitiesActionRepository.execute(data);
    const totalCount = await this.countActivitiesActionsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ActivitiesActionModel>().toPaginationList({
      items: activitiesActions,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllActivitiesActionsQuery
  ): FindAllActivitiesActionsQuery {
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
