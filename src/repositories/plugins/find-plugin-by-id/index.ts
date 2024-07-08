import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { PluginMapper } from '@/mappers/plugins';
import { PluginModel } from '@/models/plugin.model';

@Injectable()
export class FindPluginByIdRepository
  implements IBaseRepository<string, Promise<PluginModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<PluginModel> {
    return new PluginMapper().toModel(
      await this.model.plugin.findUnique({
        where: { id }
      })
    );
  }
}
