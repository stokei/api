import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllVideosMaterialsDTO } from '@/dtos/videos-materials/find-all-videos-materials.dto';
import { VideosMaterialModel } from '@/models/videos-material.model';
import { FindAllVideosMaterialsQuery } from '@/queries/implements/videos-materials/find-all-videos-materials.query';

@Injectable()
export class FindAllVideosMaterialsService
  implements
    IBaseService<
      FindAllVideosMaterialsDTO,
      Promise<IPaginatedType<VideosMaterialModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllVideosMaterialsDTO
  ): Promise<IPaginatedType<VideosMaterialModel>> {
    return await this.queryBus.execute(new FindAllVideosMaterialsQuery(data));
  }
}
