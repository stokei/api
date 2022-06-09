import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { VideoModel } from '@/models/video.model';
import { FindVideoByIdQuery } from '@/queries/implements/videos/find-video-by-id.query';

@Injectable()
export class FindVideoByIdService
  implements IBaseService<string, Promise<VideoModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<VideoModel> {
    return await this.queryBus.execute(new FindVideoByIdQuery(data));
  }
}
