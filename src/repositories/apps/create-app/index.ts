import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateAppRepositoryDTO } from '@/dtos/apps/create-app-repository.dto';
import { AppMapper } from '@/mappers/apps';
import { AppModel } from '@/models/app.model';

@Injectable()
export class CreateAppRepository
  implements IBaseRepository<CreateAppRepositoryDTO, Promise<AppModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateAppRepositoryDTO): Promise<AppModel> {
    return new AppMapper().toModel(await this.model.app.create({ data }));
  }
}
