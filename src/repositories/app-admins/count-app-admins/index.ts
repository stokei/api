import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountAppAdminsDTO } from '@/dtos/app-admins/count-app-admins.dto';
import { AppAdminMapper } from '@/mappers/app-admins';

@Injectable()
export class CountAppAdminsRepository
  implements IBaseRepository<CountAppAdminsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountAppAdminsDTO): Promise<number> {
    const appAdminMapper = new AppAdminMapper();
    return await this.model.appAdmin.count({
      where: appAdminMapper.toWhereFindAllPrisma(where)
    });
  }
}
