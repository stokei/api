import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ModuleMapper } from '@/mappers/modules';
import { ModuleModel } from '@/models/module.model';

@Injectable()
export class FindModuleByIdRepository
  implements IBaseRepository<string, Promise<ModuleModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ModuleModel> {
    return new ModuleMapper().toModel(
      await this.model.module.findUnique({
        where: { id }
      })
    );
  }
}
