import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateAppAdminDTO } from '@/dtos/app-admins/create-app-admin.dto';
import { AppAdminMapper } from '@/mappers/app-admins';
import { AppAdminModel } from '@/models/app-admin.model';

@Injectable()
export class CreateAppAdminRepository
  implements IBaseRepository<CreateAppAdminDTO, Promise<AppAdminModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateAppAdminDTO): Promise<AppAdminModel> {
    return new AppAdminMapper().toModel(
      await this.model.appAdmin.create({ data })
    );
  }
}
