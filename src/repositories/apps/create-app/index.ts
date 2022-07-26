import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateAppDTO } from '@/dtos/apps/create-app.dto';
import { AppMapper } from '@/mappers/apps';
import { AppModel } from '@/models/app.model';

@Injectable()
export class CreateAppRepository
  implements IBaseRepository<CreateAppDTO, Promise<AppModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateAppDTO): Promise<AppModel> {
    return new AppMapper().toModel(await this.model.app.create({ data }));
  }
}
