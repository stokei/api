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
import { VideoAuthorModel } from '@/models/video-author.model';
import { FindAllVideoAuthorsQuery } from '@/queries/implements/video-authors/find-all-video-authors.query';
import { CountVideoAuthorsRepository } from '@/repositories/video-authors/count-video-authors';
import { FindAllVideoAuthorsRepository } from '@/repositories/video-authors/find-all-video-authors';

@QueryHandler(FindAllVideoAuthorsQuery)
export class FindAllVideoAuthorsQueryHandler
  implements IQueryHandler<FindAllVideoAuthorsQuery>
{
  constructor(
    private readonly findAllVideoAuthorRepository: FindAllVideoAuthorsRepository,
    private readonly countVideoAuthorsRepository: CountVideoAuthorsRepository
  ) {}

  async execute(
    query: FindAllVideoAuthorsQuery
  ): Promise<IPaginatedType<VideoAuthorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const videoAuthors = await this.findAllVideoAuthorRepository.execute(data);
    const totalCount = await this.countVideoAuthorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<VideoAuthorModel>().toPaginationList({
      items: videoAuthors,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllVideoAuthorsQuery): FindAllVideoAuthorsQuery {
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
