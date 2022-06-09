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
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';
import { FindAllClassroomsPlansQuery } from '@/queries/implements/classrooms-plans/find-all-classrooms-plans.query';
import { CountClassroomsPlansRepository } from '@/repositories/classrooms-plans/count-classrooms-plans';
import { FindAllClassroomsPlansRepository } from '@/repositories/classrooms-plans/find-all-classrooms-plans';

@QueryHandler(FindAllClassroomsPlansQuery)
export class FindAllClassroomsPlansQueryHandler
  implements IQueryHandler<FindAllClassroomsPlansQuery>
{
  constructor(
    private readonly findAllClassroomsPlanRepository: FindAllClassroomsPlansRepository,
    private readonly countClassroomsPlansRepository: CountClassroomsPlansRepository
  ) {}

  async execute(
    query: FindAllClassroomsPlansQuery
  ): Promise<IPaginatedType<ClassroomsPlanModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomsPlans = await this.findAllClassroomsPlanRepository.execute(
      data
    );
    const totalCount = await this.countClassroomsPlansRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomsPlanModel>().toPaginationList({
      items: classroomsPlans,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomsPlansQuery
  ): FindAllClassroomsPlansQuery {
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
