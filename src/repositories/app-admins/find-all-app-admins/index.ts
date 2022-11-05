import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllAppAdminsDTO } from '@/dtos/app-admins/find-all-app-admins.dto';
import { AppAdminMapper } from '@/mappers/app-admins';
import { AppAdminModel } from '@/models/app-admin.model';

@Injectable()
export class FindAllAppAdminsRepository
  implements IBaseRepository<FindAllAppAdminsDTO, Promise<AppAdminModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllAppAdminsDTO): Promise<AppAdminModel[]> {
    const appAdminMapper = new AppAdminMapper();
    return appAdminMapper.toModels(
      await this.model.appAdmin.findMany(appAdminMapper.toFindAllPrisma(data))
    );
  }
}
