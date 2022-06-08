import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { ModulesVideoModel } from '@/models/modules-video.model';
import { FindModulesVideoByIdQuery } from '@/queries/implements/modules-videos/find-modules-video-by-id.query';

@Injectable()
export class FindModulesVideoByIdService
  implements IBaseService<string, Promise<ModulesVideoModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<ModulesVideoModel> {
    return await this.queryBus.execute(new FindModulesVideoByIdQuery(data));
  }
}
