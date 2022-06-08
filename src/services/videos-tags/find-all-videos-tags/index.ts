import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { VideosTagModel } from '@/models/videos-tag.model';
import { FindAllVideosTagsDTO } from '@/dtos/videos-tags/find-all-videos-tags.dto';
import { FindAllVideosTagsQuery } from '@/queries/implements/videos-tags/find-all-videos-tags.query';

@Injectable()
export class FindAllVideosTagsService
  implements
    IBaseService<FindAllVideosTagsDTO, Promise<IPaginatedType<VideosTagModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllVideosTagsDTO
  ): Promise<IPaginatedType<VideosTagModel>> {
    return await this.queryBus.execute(new FindAllVideosTagsQuery(data));
  }
}
