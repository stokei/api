import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsModulesDTO } from '@/dtos/modules/exists-modules.dto';

@Injectable()
export class ExistsModulesRepository
  implements IBaseRepository<ExistsModulesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsModulesDTO): Promise<boolean> {
    return (await this.model.module.count({ where })) > 0;
  }
}
