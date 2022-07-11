import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { VideoAuthorModel } from '@/models/video-author.model';
import { FindVideoAuthorByIdQuery } from '@/queries/implements/video-authors/find-video-author-by-id.query';

@Injectable()
export class FindVideoAuthorByIdService
  implements IBaseService<string, Promise<VideoAuthorModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<VideoAuthorModel> {
    return await this.queryBus.execute(new FindVideoAuthorByIdQuery(data));
  }
}
