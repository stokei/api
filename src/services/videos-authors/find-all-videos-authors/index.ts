import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { VideosAuthorModel } from '@/models/videos-author.model';
import { FindAllVideosAuthorsDTO } from '@/dtos/videos-authors/find-all-videos-authors.dto';
import { FindAllVideosAuthorsQuery } from '@/queries/implements/videos-authors/find-all-videos-authors.query';

@Injectable()
export class FindAllVideosAuthorsService
  implements
    IBaseService<
      FindAllVideosAuthorsDTO,
      Promise<IPaginatedType<VideosAuthorModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllVideosAuthorsDTO
  ): Promise<IPaginatedType<VideosAuthorModel>> {
    return await this.queryBus.execute(new FindAllVideosAuthorsQuery(data));
  }
}
