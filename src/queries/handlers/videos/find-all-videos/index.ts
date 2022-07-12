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
import { VideoModel } from '@/models/video.model';
import { FindAllVideosQuery } from '@/queries/implements/videos/find-all-videos.query';
import { CountVideosRepository } from '@/repositories/videos/count-videos';
import { FindAllVideosRepository } from '@/repositories/videos/find-all-videos';

@QueryHandler(FindAllVideosQuery)
export class FindAllVideosQueryHandler
  implements IQueryHandler<FindAllVideosQuery>
{
  constructor(
    private readonly findAllVideoRepository: FindAllVideosRepository,
    private readonly countVideosRepository: CountVideosRepository
  ) {}

  async execute(
    query: FindAllVideosQuery
  ): Promise<IPaginatedType<VideoModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const videos = await this.findAllVideoRepository.execute(data);
    const totalCount = await this.countVideosRepository.execute({
      where: data.where
    });
    return new PaginationMapper<VideoModel>().toPaginationList({
      items: videos,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllVideosQuery): FindAllVideosQuery {
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
