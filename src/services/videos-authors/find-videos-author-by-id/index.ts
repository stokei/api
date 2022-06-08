import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { VideosAuthorModel } from '@/models/videos-author.model';
import { FindVideosAuthorByIdQuery } from '@/queries/implements/videos-authors/find-videos-author-by-id.query';

@Injectable()
export class FindVideosAuthorByIdService
  implements IBaseService<string, Promise<VideosAuthorModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<VideosAuthorModel> {
    return await this.queryBus.execute(new FindVideosAuthorByIdQuery(data));
  }
}
