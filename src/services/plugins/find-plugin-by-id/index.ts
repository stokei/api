import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PluginModel } from '@/models/plugin.model';
import { FindPluginByIdQuery } from '@/queries/implements/plugins/find-plugin-by-id.query';

@Injectable()
export class FindPluginByIdService
  implements IBaseService<string, Promise<PluginModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<PluginModel> {
    return await this.queryBus.execute(new FindPluginByIdQuery(data));
  }
}
