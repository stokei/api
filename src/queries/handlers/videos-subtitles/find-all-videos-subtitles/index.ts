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
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';
import { FindAllVideosSubtitlesQuery } from '@/queries/implements/videos-subtitles/find-all-videos-subtitles.query';
import { CountVideosSubtitlesRepository } from '@/repositories/videos-subtitles/count-videos-subtitles';
import { FindAllVideosSubtitlesRepository } from '@/repositories/videos-subtitles/find-all-videos-subtitles';

@QueryHandler(FindAllVideosSubtitlesQuery)
export class FindAllVideosSubtitlesQueryHandler
  implements IQueryHandler<FindAllVideosSubtitlesQuery>
{
  constructor(
    private readonly findAllVideosSubtitleRepository: FindAllVideosSubtitlesRepository,
    private readonly countVideosSubtitlesRepository: CountVideosSubtitlesRepository
  ) {}

  async execute(
    query: FindAllVideosSubtitlesQuery
  ): Promise<IPaginatedType<VideosSubtitleModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const videosSubtitles = await this.findAllVideosSubtitleRepository.execute(
      data
    );
    const totalCount = await this.countVideosSubtitlesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<VideosSubtitleModel>().toPaginationList({
      items: videosSubtitles,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllVideosSubtitlesQuery
  ): FindAllVideosSubtitlesQuery {
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
