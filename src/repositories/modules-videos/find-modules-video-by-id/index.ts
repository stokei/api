import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { ModulesVideoMapper } from '@/mappers/modules-videos';
import { ModulesVideoModel } from '@/models/modules-video.model';

@Injectable()
export class FindModulesVideoByIdRepository
  implements IBaseRepository<string, Promise<ModulesVideoModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ModulesVideoModel> {
    return new ModulesVideoMapper().toModel(
      await this.model.modulesVideo.findUnique({
        where: { id }
      })
    );
  }
}
