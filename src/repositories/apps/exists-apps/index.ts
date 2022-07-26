import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsAppsDTO } from '@/dtos/apps/exists-apps.dto';

@Injectable()
export class ExistsAppsRepository
  implements IBaseRepository<ExistsAppsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsAppsDTO): Promise<boolean> {
    return (await this.model.app.count({ where })) > 0;
  }
}
