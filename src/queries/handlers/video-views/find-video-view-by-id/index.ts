import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoViewNotFoundException
} from '@/errors';
import { VideoViewModel } from '@/models/video-view.model';
import { FindVideoViewByIdQuery } from '@/queries/implements/video-views/find-video-view-by-id.query';
import { FindVideoViewByIdRepository } from '@/repositories/video-views/find-video-view-by-id';

@QueryHandler(FindVideoViewByIdQuery)
export class FindVideoViewByIdQueryHandler
  implements IQueryHandler<FindVideoViewByIdQuery>
{
  constructor(
    private readonly findVideoViewByIdRepository: FindVideoViewByIdRepository
  ) {}

  async execute(query: FindVideoViewByIdQuery): Promise<VideoViewModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const videoView = await this.findVideoViewByIdRepository.execute(id);
    if (!videoView) {
      throw new VideoViewNotFoundException();
    }
    return videoView;
  }
}
