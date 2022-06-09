import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  VideosSubtitleNotFoundException
} from '@/errors';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';
import { FindVideosSubtitleByIdQuery } from '@/queries/implements/videos-subtitles/find-videos-subtitle-by-id.query';
import { FindVideosSubtitleByIdRepository } from '@/repositories/videos-subtitles/find-videos-subtitle-by-id';

@QueryHandler(FindVideosSubtitleByIdQuery)
export class FindVideosSubtitleByIdQueryHandler
  implements IQueryHandler<FindVideosSubtitleByIdQuery>
{
  constructor(
    private readonly findVideosSubtitleByIdRepository: FindVideosSubtitleByIdRepository
  ) {}

  async execute(
    query: FindVideosSubtitleByIdQuery
  ): Promise<VideosSubtitleModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const videosSubtitle = await this.findVideosSubtitleByIdRepository.execute(
      id
    );
    if (!videosSubtitle) {
      throw new VideosSubtitleNotFoundException();
    }
    return videosSubtitle;
  }
}
