import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountAppsDTO } from '@/dtos/apps/count-apps.dto';
import { AppMapper } from '@/mappers/apps';

@Injectable()
export class CountAppsRepository
  implements IBaseRepository<CountAppsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountAppsDTO): Promise<number> {
    const appMapper = new AppMapper();
    return await this.model.app.count({
      where: appMapper.toWhereFindAllPrisma(where)
    });
  }
}
