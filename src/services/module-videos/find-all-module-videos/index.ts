import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllModuleVideosDTO } from '@/dtos/module-videos/find-all-module-videos.dto';
import { ModuleVideoModel } from '@/models/module-video.model';
import { FindAllModuleVideosQuery } from '@/queries/implements/module-videos/find-all-module-videos.query';

@Injectable()
export class FindAllModuleVideosService
  implements
    IBaseService<
      FindAllModuleVideosDTO,
      Promise<IPaginatedType<ModuleVideoModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllModuleVideosDTO
  ): Promise<IPaginatedType<ModuleVideoModel>> {
    return await this.queryBus.execute(new FindAllModuleVideosQuery(data));
  }
}
