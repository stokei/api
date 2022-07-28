import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllAppsDTO } from '@/dtos/apps/find-all-apps.dto';
import { AppMapper } from '@/mappers/apps';
import { AppModel } from '@/models/app.model';

@Injectable()
export class FindAllAppsRepository
  implements IBaseRepository<FindAllAppsDTO, Promise<AppModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllAppsDTO): Promise<AppModel[]> {
    const appMapper = new AppMapper();
    return appMapper.toModels(
      await this.model.app.findMany(appMapper.toFindAllPrisma(data))
    );
  }
}
