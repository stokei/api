import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePluginDTO } from '@/dtos/plugins/create-plugin.dto';
import { PluginMapper } from '@/mappers/plugins';
import { PluginModel } from '@/models/plugin.model';

@Injectable()
export class CreatePluginRepository
  implements IBaseRepository<CreatePluginDTO, Promise<PluginModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePluginDTO): Promise<PluginModel> {
    return new PluginMapper().toModel(await this.model.plugin.create({ data }));
  }
}
