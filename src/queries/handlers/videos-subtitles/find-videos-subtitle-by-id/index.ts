import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  VideosSubtitleNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';
import { FindVideosSubtitleByIdRepository } from '@/repositories/videos-subtitles/find-videos-subtitle-by-id';
import { FindVideosSubtitleByIdQuery } from '@/queries/implements/videos-subtitles/find-videos-subtitle-by-id.query';

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
