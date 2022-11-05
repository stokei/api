import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { AppAdminMapper } from '@/mappers/app-admins';
import { AppAdminModel } from '@/models/app-admin.model';

@Injectable()
export class FindAppAdminByIdRepository
  implements IBaseRepository<string, Promise<AppAdminModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<AppAdminModel> {
    return new AppAdminMapper().toModel(
      await this.model.appAdmin.findUnique({
        where: { id }
      })
    );
  }
}
