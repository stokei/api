import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  VideosAuthorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { VideosAuthorModel } from '@/models/videos-author.model';
import { FindVideosAuthorByIdRepository } from '@/repositories/videos-authors/find-videos-author-by-id';
import { FindVideosAuthorByIdQuery } from '@/queries/implements/videos-authors/find-videos-author-by-id.query';

@QueryHandler(FindVideosAuthorByIdQuery)
export class FindVideosAuthorByIdQueryHandler
  implements IQueryHandler<FindVideosAuthorByIdQuery>
{
  constructor(
    private readonly findVideosAuthorByIdRepository: FindVideosAuthorByIdRepository
  ) {}

  async execute(query: FindVideosAuthorByIdQuery): Promise<VideosAuthorModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const videosAuthor = await this.findVideosAuthorByIdRepository.execute(id);
    if (!videosAuthor) {
      throw new VideosAuthorNotFoundException();
    }
    return videosAuthor;
  }
}
