import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllVideoAuthorsDTO } from '@/dtos/video-authors/find-all-video-authors.dto';
import { VideoAuthorModel } from '@/models/video-author.model';
import { FindAllVideoAuthorsQuery } from '@/queries/implements/video-authors/find-all-video-authors.query';

@Injectable()
export class FindAllVideoAuthorsService
  implements
    IBaseService<
      FindAllVideoAuthorsDTO,
      Promise<IPaginatedType<VideoAuthorModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllVideoAuthorsDTO
  ): Promise<IPaginatedType<VideoAuthorModel>> {
    return await this.queryBus.execute(new FindAllVideoAuthorsQuery(data));
  }
}
