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
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';
import { FindAllClassroomsTagsQuery } from '@/queries/implements/classrooms-tags/find-all-classrooms-tags.query';
import { CountClassroomsTagsRepository } from '@/repositories/classrooms-tags/count-classrooms-tags';
import { FindAllClassroomsTagsRepository } from '@/repositories/classrooms-tags/find-all-classrooms-tags';

@QueryHandler(FindAllClassroomsTagsQuery)
export class FindAllClassroomsTagsQueryHandler
  implements IQueryHandler<FindAllClassroomsTagsQuery>
{
  constructor(
    private readonly findAllClassroomsTagRepository: FindAllClassroomsTagsRepository,
    private readonly countClassroomsTagsRepository: CountClassroomsTagsRepository
  ) {}

  async execute(
    query: FindAllClassroomsTagsQuery
  ): Promise<IPaginatedType<ClassroomsTagModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomsTags = await this.findAllClassroomsTagRepository.execute(
      data
    );
    const totalCount = await this.countClassroomsTagsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomsTagModel>().toPaginationList({
      items: classroomsTags,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomsTagsQuery
  ): FindAllClassroomsTagsQuery {
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
