import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllPluginsDTO } from '@/dtos/plugins/find-all-plugins.dto';
import { PluginModel } from '@/models/plugin.model';
import { FindAllPluginsQuery } from '@/queries/implements/plugins/find-all-plugins.query';

@Injectable()
export class FindAllPluginsService
  implements
    IBaseService<FindAllPluginsDTO, Promise<IPaginatedType<PluginModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllPluginsDTO): Promise<IPaginatedType<PluginModel>> {
    return await this.queryBus.execute(new FindAllPluginsQuery(data));
  }
}
