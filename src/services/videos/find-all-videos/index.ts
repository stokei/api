import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllVideosDTO } from '@/dtos/videos/find-all-videos.dto';
import { VideoModel } from '@/models/video.model';
import { FindAllVideosQuery } from '@/queries/implements/videos/find-all-videos.query';

@Injectable()
export class FindAllVideosService
  implements
    IBaseService<FindAllVideosDTO, Promise<IPaginatedType<VideoModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllVideosDTO): Promise<IPaginatedType<VideoModel>> {
    return await this.queryBus.execute(new FindAllVideosQuery(data));
  }
}
