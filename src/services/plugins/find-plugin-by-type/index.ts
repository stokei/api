import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindPluginByTypeDTO } from '@/dtos/plugins/find-plugin-by-type.dto';
import { PluginModel } from '@/models/plugin.model';
import { FindPluginByTypeQuery } from '@/queries/implements/plugins/find-plugin-by-type.query';

@Injectable()
export class FindPluginByTypeService
  implements IBaseService<FindPluginByTypeDTO, Promise<PluginModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindPluginByTypeDTO): Promise<PluginModel | undefined> {
    return await this.queryBus.execute(new FindPluginByTypeQuery(data));
  }
}
