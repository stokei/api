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
import { ClassroomsStudentModel } from '@/models/classrooms-student.model';
import { FindAllClassroomsStudentsQuery } from '@/queries/implements/classrooms-students/find-all-classrooms-students.query';
import { CountClassroomsStudentsRepository } from '@/repositories/classrooms-students/count-classrooms-students';
import { FindAllClassroomsStudentsRepository } from '@/repositories/classrooms-students/find-all-classrooms-students';

@QueryHandler(FindAllClassroomsStudentsQuery)
export class FindAllClassroomsStudentsQueryHandler
  implements IQueryHandler<FindAllClassroomsStudentsQuery>
{
  constructor(
    private readonly findAllClassroomsStudentRepository: FindAllClassroomsStudentsRepository,
    private readonly countClassroomsStudentsRepository: CountClassroomsStudentsRepository
  ) {}

  async execute(
    query: FindAllClassroomsStudentsQuery
  ): Promise<IPaginatedType<ClassroomsStudentModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomsStudents =
      await this.findAllClassroomsStudentRepository.execute(data);
    const totalCount = await this.countClassroomsStudentsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomsStudentModel>().toPaginationList({
      items: classroomsStudents,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomsStudentsQuery
  ): FindAllClassroomsStudentsQuery {
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
