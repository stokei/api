import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountModulesDTO } from '@/dtos/modules/count-modules.dto';
import { ModuleMapper } from '@/mappers/modules';

@Injectable()
export class CountModulesRepository
  implements IBaseRepository<CountModulesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountModulesDTO): Promise<number> {
    const moduleMapper = new ModuleMapper();
    return await this.model.module.count({
      where: moduleMapper.toWhereFindAllPrisma(where)
    });
  }
}
