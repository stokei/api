import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ModuleVideoMapper } from '@/mappers/module-videos';
import { ModuleVideoModel } from '@/models/module-video.model';

@Injectable()
export class FindModuleVideoByIdRepository
  implements IBaseRepository<string, Promise<ModuleVideoModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ModuleVideoModel> {
    return new ModuleVideoMapper().toModel(
      await this.model.moduleVideo.findUnique({
        where: { id }
      })
    );
  }
}
