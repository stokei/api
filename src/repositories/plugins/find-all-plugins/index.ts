import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllPluginsDTO } from '@/dtos/plugins/find-all-plugins.dto';
import { PluginMapper } from '@/mappers/plugins';
import { PluginModel } from '@/models/plugin.model';

@Injectable()
export class FindAllPluginsRepository
  implements IBaseRepository<FindAllPluginsDTO, Promise<PluginModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllPluginsDTO): Promise<PluginModel[]> {
    const pluginMapper = new PluginMapper();
    return pluginMapper.toModels(
      await this.model.plugin.findMany(pluginMapper.toFindAllPrisma(data))
    );
  }
}
