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
import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';
import { FindAllClassroomsMaterialsQuery } from '@/queries/implements/classrooms-materials/find-all-classrooms-materials.query';
import { CountClassroomsMaterialsRepository } from '@/repositories/classrooms-materials/count-classrooms-materials';
import { FindAllClassroomsMaterialsRepository } from '@/repositories/classrooms-materials/find-all-classrooms-materials';

@QueryHandler(FindAllClassroomsMaterialsQuery)
export class FindAllClassroomsMaterialsQueryHandler
  implements IQueryHandler<FindAllClassroomsMaterialsQuery>
{
  constructor(
    private readonly findAllClassroomsMaterialRepository: FindAllClassroomsMaterialsRepository,
    private readonly countClassroomsMaterialsRepository: CountClassroomsMaterialsRepository
  ) {}

  async execute(
    query: FindAllClassroomsMaterialsQuery
  ): Promise<IPaginatedType<ClassroomsMaterialModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomsMaterials =
      await this.findAllClassroomsMaterialRepository.execute(data);
    const totalCount = await this.countClassroomsMaterialsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomsMaterialModel>().toPaginationList({
      items: classroomsMaterials,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomsMaterialsQuery
  ): FindAllClassroomsMaterialsQuery {
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
