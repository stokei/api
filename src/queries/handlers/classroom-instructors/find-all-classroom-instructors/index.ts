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
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';
import { FindAllClassroomInstructorsQuery } from '@/queries/implements/classroom-instructors/find-all-classroom-instructors.query';
import { CountClassroomInstructorsRepository } from '@/repositories/classroom-instructors/count-classroom-instructors';
import { FindAllClassroomInstructorsRepository } from '@/repositories/classroom-instructors/find-all-classroom-instructors';

@QueryHandler(FindAllClassroomInstructorsQuery)
export class FindAllClassroomInstructorsQueryHandler
  implements IQueryHandler<FindAllClassroomInstructorsQuery>
{
  constructor(
    private readonly findAllClassroomInstructorRepository: FindAllClassroomInstructorsRepository,
    private readonly countClassroomInstructorsRepository: CountClassroomInstructorsRepository
  ) {}

  async execute(
    query: FindAllClassroomInstructorsQuery
  ): Promise<IPaginatedType<ClassroomInstructorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomInstructors =
      await this.findAllClassroomInstructorRepository.execute(data);
    const totalCount = await this.countClassroomInstructorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomInstructorModel>().toPaginationList({
      items: classroomInstructors,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomInstructorsQuery
  ): FindAllClassroomInstructorsQuery {
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
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
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
