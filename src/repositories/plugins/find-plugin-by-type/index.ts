import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindPluginByTypeDTO } from '@/dtos/plugins/find-plugin-by-type.dto';
import { PluginMapper } from '@/mappers/plugins';
import { PluginModel } from '@/models/plugin.model';

@Injectable()
export class FindPluginByTypeRepository
  implements IBaseRepository<FindPluginByTypeDTO, Promise<PluginModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindPluginByTypeDTO): Promise<PluginModel> {
    const pluginMapper = new PluginMapper();
    return pluginMapper.toModel(
      await this.model.plugin.findFirst({
        where: {
          parent: data.parent,
          type: data.type
        }
      })
    );
  }
}
