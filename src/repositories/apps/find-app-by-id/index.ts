import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { AppMapper } from '@/mappers/apps';
import { AppModel } from '@/models/app.model';

@Injectable()
export class FindAppByIdRepository
  implements IBaseRepository<string, Promise<AppModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<AppModel> {
    return new AppMapper().toModel(
      await this.model.app.findUnique({
        where: { id }
      })
    );
  }
}
