import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import { PluginType } from '@/enums/plugin-type.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PluginNotFoundException
} from '@/errors';
import { PluginModel } from '@/models/plugin.model';
import { FindPluginByTypeQuery } from '@/queries/implements/plugins/find-plugin-by-type.query';
import { FindPluginByTypeRepository } from '@/repositories/plugins/find-plugin-by-type';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@QueryHandler(FindPluginByTypeQuery)
export class FindPluginByTypeQueryHandler
  implements IQueryHandler<FindPluginByTypeQuery>
{
  constructor(
    private readonly findPluginByTypeRepository: FindPluginByTypeRepository,
    private readonly findAppByIdService: FindAppByIdService
  ) {}

  async execute(query: FindPluginByTypeQuery): Promise<PluginModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const parent = cleanValue(query.parent);
    if (!parent) {
      throw new ParamNotFoundException('parent');
    }
    const type = cleanValue(query.type) as PluginType;
    if (!type) {
      throw new ParamNotFoundException('type');
    }
    const plugin = await this.findPluginByTypeRepository.execute({
      app: query.app,
      parent,
      type
    });
    const app = await this.findAppByIdService.execute(query.app);
    if (!app?.isStokei && !plugin) {
      throw new PluginNotFoundException();
    }
    return plugin;
  }
}
