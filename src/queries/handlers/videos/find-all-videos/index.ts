import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { VideoMapper } from '@/mappers/videos';
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

    const data = new VideoMapper().toFindAllQueryClean(query);
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
}
