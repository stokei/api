import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { VideosSubtitleModel } from '@/models/videos-subtitle.model';
import { FindAllVideosSubtitlesDTO } from '@/dtos/videos-subtitles/find-all-videos-subtitles.dto';
import { FindAllVideosSubtitlesQuery } from '@/queries/implements/videos-subtitles/find-all-videos-subtitles.query';

@Injectable()
export class FindAllVideosSubtitlesService
  implements
    IBaseService<
      FindAllVideosSubtitlesDTO,
      Promise<IPaginatedType<VideosSubtitleModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllVideosSubtitlesDTO
  ): Promise<IPaginatedType<VideosSubtitleModel>> {
    return await this.queryBus.execute(new FindAllVideosSubtitlesQuery(data));
  }
}
