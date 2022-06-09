import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllModulesVideosDTO } from '@/dtos/modules-videos/find-all-modules-videos.dto';
import { ModulesVideoModel } from '@/models/modules-video.model';
import { FindAllModulesVideosQuery } from '@/queries/implements/modules-videos/find-all-modules-videos.query';

@Injectable()
export class FindAllModulesVideosService
  implements
    IBaseService<
      FindAllModulesVideosDTO,
      Promise<IPaginatedType<ModulesVideoModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllModulesVideosDTO
  ): Promise<IPaginatedType<ModulesVideoModel>> {
    return await this.queryBus.execute(new FindAllModulesVideosQuery(data));
  }
}
