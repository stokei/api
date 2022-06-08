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
import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';
import { FindAllClassroomsEnrollmentsQuery } from '@/queries/implements/classrooms-enrollments/find-all-classrooms-enrollments.query';
import { CountClassroomsEnrollmentsRepository } from '@/repositories/classrooms-enrollments/count-classrooms-enrollments';
import { FindAllClassroomsEnrollmentsRepository } from '@/repositories/classrooms-enrollments/find-all-classrooms-enrollments';

@QueryHandler(FindAllClassroomsEnrollmentsQuery)
export class FindAllClassroomsEnrollmentsQueryHandler
  implements IQueryHandler<FindAllClassroomsEnrollmentsQuery>
{
  constructor(
    private readonly findAllClassroomsEnrollmentRepository: FindAllClassroomsEnrollmentsRepository,
    private readonly countClassroomsEnrollmentsRepository: CountClassroomsEnrollmentsRepository
  ) {}

  async execute(
    query: FindAllClassroomsEnrollmentsQuery
  ): Promise<IPaginatedType<ClassroomsEnrollmentModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomsEnrollments =
      await this.findAllClassroomsEnrollmentRepository.execute(data);
    const totalCount = await this.countClassroomsEnrollmentsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomsEnrollmentModel>().toPaginationList({
      items: classroomsEnrollments,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomsEnrollmentsQuery
  ): FindAllClassroomsEnrollmentsQuery {
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
