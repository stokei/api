import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdatePluginDTO } from '@/dtos/plugins/update-plugin.dto';

@Injectable()
export class UpdatePluginRepository
  implements IBaseRepository<UpdatePluginDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdatePluginDTO): Promise<boolean> {
    const updated = await this.model.plugin.update({
      where: {
        id: where?.plugin
      },
      data
    });
    return !!updated;
  }
}
