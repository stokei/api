import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { VideosTagModel } from '@/models/videos-tag.model';
import { FindVideosTagByIdQuery } from '@/queries/implements/videos-tags/find-videos-tag-by-id.query';

@Injectable()
export class FindVideosTagByIdService
  implements IBaseService<string, Promise<VideosTagModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<VideosTagModel> {
    return await this.queryBus.execute(new FindVideosTagByIdQuery(data));
  }
}
