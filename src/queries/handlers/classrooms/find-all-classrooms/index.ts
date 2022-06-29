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
import { ClassroomModel } from '@/models/classroom.model';
import { FindAllClassroomsQuery } from '@/queries/implements/classrooms/find-all-classrooms.query';
import { CountClassroomsRepository } from '@/repositories/classrooms/count-classrooms';
import { FindAllClassroomsRepository } from '@/repositories/classrooms/find-all-classrooms';

@QueryHandler(FindAllClassroomsQuery)
export class FindAllClassroomsQueryHandler
  implements IQueryHandler<FindAllClassroomsQuery>
{
  constructor(
    private readonly findAllClassroomRepository: FindAllClassroomsRepository,
    private readonly countClassroomsRepository: CountClassroomsRepository
  ) {}

  async execute(
    query: FindAllClassroomsQuery
  ): Promise<IPaginatedType<ClassroomModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classrooms = await this.findAllClassroomRepository.execute(data);
    const totalCount = await this.countClassroomsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomModel>().toPaginationList({
      items: classrooms,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllClassroomsQuery): FindAllClassroomsQuery {
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
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
}
