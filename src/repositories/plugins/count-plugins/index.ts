import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountPluginsDTO } from '@/dtos/plugins/count-plugins.dto';
import { PluginMapper } from '@/mappers/plugins';

@Injectable()
export class CountPluginsRepository
  implements IBaseRepository<CountPluginsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountPluginsDTO): Promise<number> {
    const pluginMapper = new PluginMapper();
    return await this.model.plugin.count({
      where: pluginMapper.toWhereFindAllPrisma(where)
    });
  }
}
