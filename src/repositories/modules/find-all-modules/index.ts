import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllModulesDTO } from '@/dtos/modules/find-all-modules.dto';
import { ModuleMapper } from '@/mappers/modules';
import { ModuleModel } from '@/models/module.model';

@Injectable()
export class FindAllModulesRepository
  implements IBaseRepository<FindAllModulesDTO, Promise<ModuleModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllModulesDTO): Promise<ModuleModel[]> {
    const moduleMapper = new ModuleMapper();
    return moduleMapper.toModels(
      await this.model.module.findMany(moduleMapper.toFindAllPrisma(data))
    );
  }
}
