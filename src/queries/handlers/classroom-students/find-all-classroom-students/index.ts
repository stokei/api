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
import { ClassroomStudentModel } from '@/models/classroom-student.model';
import { FindAllClassroomStudentsQuery } from '@/queries/implements/classroom-students/find-all-classroom-students.query';
import { CountClassroomStudentsRepository } from '@/repositories/classroom-students/count-classroom-students';
import { FindAllClassroomStudentsRepository } from '@/repositories/classroom-students/find-all-classroom-students';

@QueryHandler(FindAllClassroomStudentsQuery)
export class FindAllClassroomStudentsQueryHandler
  implements IQueryHandler<FindAllClassroomStudentsQuery>
{
  constructor(
    private readonly findAllClassroomStudentRepository: FindAllClassroomStudentsRepository,
    private readonly countClassroomStudentsRepository: CountClassroomStudentsRepository
  ) {}

  async execute(
    query: FindAllClassroomStudentsQuery
  ): Promise<IPaginatedType<ClassroomStudentModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomStudents =
      await this.findAllClassroomStudentRepository.execute(data);
    const totalCount = await this.countClassroomStudentsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomStudentModel>().toPaginationList({
      items: classroomStudents,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomStudentsQuery
  ): FindAllClassroomStudentsQuery {
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
          classroom: cleanWhereDataString(operatorData.classroom),
          student: cleanWhereDataSearch(operatorData.student),
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
        student: cleanSortValue(query.orderBy?.student),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
}
