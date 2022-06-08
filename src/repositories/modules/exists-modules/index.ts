import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsModulesDTO } from '@/dtos/modules/exists-modules.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsModulesRepository
  implements IBaseRepository<ExistsModulesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsModulesDTO): Promise<boolean> {
    return (await this.model.module.count({ where })) > 0;
  }
}
