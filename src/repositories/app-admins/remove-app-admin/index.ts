import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveAppAdminDTO } from '@/dtos/app-admins/remove-app-admin.dto';

@Injectable()
export class RemoveAppAdminRepository
  implements IBaseRepository<RemoveAppAdminDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveAppAdminDTO): Promise<boolean> {
    const removed = await this.model.appAdmin.deleteMany({
      where: {
        app: where?.app,
        admin: where?.admin
      }
    });
    return removed?.count > 0;
  }
}
