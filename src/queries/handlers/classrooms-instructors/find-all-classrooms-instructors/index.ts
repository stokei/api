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
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';
import { FindAllClassroomsInstructorsQuery } from '@/queries/implements/classrooms-instructors/find-all-classrooms-instructors.query';
import { CountClassroomsInstructorsRepository } from '@/repositories/classrooms-instructors/count-classrooms-instructors';
import { FindAllClassroomsInstructorsRepository } from '@/repositories/classrooms-instructors/find-all-classrooms-instructors';

@QueryHandler(FindAllClassroomsInstructorsQuery)
export class FindAllClassroomsInstructorsQueryHandler
  implements IQueryHandler<FindAllClassroomsInstructorsQuery>
{
  constructor(
    private readonly findAllClassroomsInstructorRepository: FindAllClassroomsInstructorsRepository,
    private readonly countClassroomsInstructorsRepository: CountClassroomsInstructorsRepository
  ) {}

  async execute(
    query: FindAllClassroomsInstructorsQuery
  ): Promise<IPaginatedType<ClassroomsInstructorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomsInstructors =
      await this.findAllClassroomsInstructorRepository.execute(data);
    const totalCount = await this.countClassroomsInstructorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomsInstructorModel>().toPaginationList({
      items: classroomsInstructors,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomsInstructorsQuery
  ): FindAllClassroomsInstructorsQuery {
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
