import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  VideoNotFoundException
} from '@/errors';
import { VideoModel } from '@/models/video.model';
import { FindVideoByIdQuery } from '@/queries/implements/videos/find-video-by-id.query';
import { FindVideoByIdRepository } from '@/repositories/videos/find-video-by-id';

@QueryHandler(FindVideoByIdQuery)
export class FindVideoByIdQueryHandler
  implements IQueryHandler<FindVideoByIdQuery>
{
  constructor(
    private readonly findVideoByIdRepository: FindVideoByIdRepository
  ) {}

  async execute(query: FindVideoByIdQuery): Promise<VideoModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const video = await this.findVideoByIdRepository.execute(id);
    if (!video) {
      throw new VideoNotFoundException();
    }
    return video;
  }
}
