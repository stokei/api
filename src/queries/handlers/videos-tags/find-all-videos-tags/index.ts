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
import { VideosTagModel } from '@/models/videos-tag.model';
import { FindAllVideosTagsQuery } from '@/queries/implements/videos-tags/find-all-videos-tags.query';
import { CountVideosTagsRepository } from '@/repositories/videos-tags/count-videos-tags';
import { FindAllVideosTagsRepository } from '@/repositories/videos-tags/find-all-videos-tags';

@QueryHandler(FindAllVideosTagsQuery)
export class FindAllVideosTagsQueryHandler
  implements IQueryHandler<FindAllVideosTagsQuery>
{
  constructor(
    private readonly findAllVideosTagRepository: FindAllVideosTagsRepository,
    private readonly countVideosTagsRepository: CountVideosTagsRepository
  ) {}

  async execute(
    query: FindAllVideosTagsQuery
  ): Promise<IPaginatedType<VideosTagModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const videosTags = await this.findAllVideosTagRepository.execute(data);
    const totalCount = await this.countVideosTagsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<VideosTagModel>().toPaginationList({
      items: videosTags,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllVideosTagsQuery): FindAllVideosTagsQuery {
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
