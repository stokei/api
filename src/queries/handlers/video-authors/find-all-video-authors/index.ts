import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { VideoAuthorMapper } from '@/mappers/video-authors';
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

    const data = new VideoAuthorMapper().toFindAllQueryClean(query);
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
}
