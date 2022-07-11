import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ModuleVideoModel } from '@/models/module-video.model';
import { FindModuleVideoByIdQuery } from '@/queries/implements/module-videos/find-module-video-by-id.query';

@Injectable()
export class FindModuleVideoByIdService
  implements IBaseService<string, Promise<ModuleVideoModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ModuleVideoModel> {
    return await this.queryBus.execute(new FindModuleVideoByIdQuery(data));
  }
}
