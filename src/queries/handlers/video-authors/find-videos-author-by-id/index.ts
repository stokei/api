import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoAuthorNotFoundException
} from '@/errors';
import { VideoAuthorModel } from '@/models/video-author.model';
import { FindVideoAuthorByIdQuery } from '@/queries/implements/video-authors/find-video-author-by-id.query';
import { FindVideoAuthorByIdRepository } from '@/repositories/video-authors/find-video-author-by-id';

@QueryHandler(FindVideoAuthorByIdQuery)
export class FindVideoAuthorByIdQueryHandler
  implements IQueryHandler<FindVideoAuthorByIdQuery>
{
  constructor(
    private readonly findVideoAuthorByIdRepository: FindVideoAuthorByIdRepository
  ) {}

  async execute(query: FindVideoAuthorByIdQuery): Promise<VideoAuthorModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const videoAuthor = await this.findVideoAuthorByIdRepository.execute(id);
    if (!videoAuthor) {
      throw new VideoAuthorNotFoundException();
    }
    return videoAuthor;
  }
}
