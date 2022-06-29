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
import { VideosAuthorModel } from '@/models/videos-author.model';
import { FindAllVideosAuthorsQuery } from '@/queries/implements/videos-authors/find-all-videos-authors.query';
import { CountVideosAuthorsRepository } from '@/repositories/videos-authors/count-videos-authors';
import { FindAllVideosAuthorsRepository } from '@/repositories/videos-authors/find-all-videos-authors';

@QueryHandler(FindAllVideosAuthorsQuery)
export class FindAllVideosAuthorsQueryHandler
  implements IQueryHandler<FindAllVideosAuthorsQuery>
{
  constructor(
    private readonly findAllVideosAuthorRepository: FindAllVideosAuthorsRepository,
    private readonly countVideosAuthorsRepository: CountVideosAuthorsRepository
  ) {}

  async execute(
    query: FindAllVideosAuthorsQuery
  ): Promise<IPaginatedType<VideosAuthorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const videosAuthors = await this.findAllVideosAuthorRepository.execute(
      data
    );
    const totalCount = await this.countVideosAuthorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<VideosAuthorModel>().toPaginationList({
      items: videosAuthors,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllVideosAuthorsQuery
  ): FindAllVideosAuthorsQuery {
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
