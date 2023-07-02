import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { VideoViewModel } from '@/models/video-view.model';
import { FindVideoViewByIdQuery } from '@/queries/implements/video-views/find-video-view-by-id.query';

@Injectable()
export class FindVideoViewByIdService
  implements IBaseService<string, Promise<VideoViewModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<VideoViewModel> {
    return await this.queryBus.execute(new FindVideoViewByIdQuery(data));
  }
}
