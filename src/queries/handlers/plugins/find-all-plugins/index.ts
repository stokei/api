import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { PluginMapper } from '@/mappers/plugins';
import { PluginModel } from '@/models/plugin.model';
import { FindAllPluginsQuery } from '@/queries/implements/plugins/find-all-plugins.query';
import { CountPluginsRepository } from '@/repositories/plugins/count-plugins';
import { FindAllPluginsRepository } from '@/repositories/plugins/find-all-plugins';

@QueryHandler(FindAllPluginsQuery)
export class FindAllPluginsQueryHandler
  implements IQueryHandler<FindAllPluginsQuery>
{
  constructor(
    private readonly findAllPluginRepository: FindAllPluginsRepository,
    private readonly countPluginsRepository: CountPluginsRepository
  ) {}

  async execute(
    query: FindAllPluginsQuery
  ): Promise<IPaginatedType<PluginModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new PluginMapper().toFindAllQueryClean(query);
    const apps = await this.findAllPluginRepository.execute(data);
    const totalCount = await this.countPluginsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PluginModel>().toPaginationList({
      items: apps,
      page: data.page,
      totalCount
    });
  }
}
