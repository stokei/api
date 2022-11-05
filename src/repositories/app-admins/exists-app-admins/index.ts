import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsAppAdminsDTO } from '@/dtos/app-admins/exists-app-admins.dto';

@Injectable()
export class ExistsAppAdminsRepository
  implements IBaseRepository<ExistsAppAdminsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsAppAdminsDTO): Promise<boolean> {
    return (await this.model.appAdmin.count({ where })) > 0;
  }
}
