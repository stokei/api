import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  PluginNotFoundException
} from '@/errors';
import { PluginModel } from '@/models/plugin.model';
import { FindPluginByIdQuery } from '@/queries/implements/plugins/find-plugin-by-id.query';
import { FindPluginByIdRepository } from '@/repositories/plugins/find-plugin-by-id';

@QueryHandler(FindPluginByIdQuery)
export class FindPluginByIdQueryHandler
  implements IQueryHandler<FindPluginByIdQuery>
{
  constructor(
    private readonly findPluginByIdRepository: FindPluginByIdRepository
  ) {}

  async execute(query: FindPluginByIdQuery): Promise<PluginModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const app = await this.findPluginByIdRepository.execute(id);
    if (!app) {
      throw new PluginNotFoundException();
    }
    return app;
  }
}
