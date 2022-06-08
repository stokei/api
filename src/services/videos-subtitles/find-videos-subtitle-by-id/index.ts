import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';
import { FindVideosSubtitleByIdQuery } from '@/queries/implements/videos-subtitles/find-videos-subtitle-by-id.query';

@Injectable()
export class FindVideosSubtitleByIdService
  implements IBaseService<string, Promise<VideosSubtitleModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<VideosSubtitleModel> {
    return await this.queryBus.execute(new FindVideosSubtitleByIdQuery(data));
  }
}
