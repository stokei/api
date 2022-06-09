import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  VideosTagNotFoundException
} from '@/errors';
import { VideosTagModel } from '@/models/videos-tag.model';
import { FindVideosTagByIdQuery } from '@/queries/implements/videos-tags/find-videos-tag-by-id.query';
import { FindVideosTagByIdRepository } from '@/repositories/videos-tags/find-videos-tag-by-id';

@QueryHandler(FindVideosTagByIdQuery)
export class FindVideosTagByIdQueryHandler
  implements IQueryHandler<FindVideosTagByIdQuery>
{
  constructor(
    private readonly findVideosTagByIdRepository: FindVideosTagByIdRepository
  ) {}

  async execute(query: FindVideosTagByIdQuery): Promise<VideosTagModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const videosTag = await this.findVideosTagByIdRepository.execute(id);
    if (!videosTag) {
      throw new VideosTagNotFoundException();
    }
    return videosTag;
  }
}
