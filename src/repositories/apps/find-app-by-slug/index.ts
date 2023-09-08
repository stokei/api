import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { AppMapper } from '@/mappers/apps';
import { AppModel } from '@/models/app.model';

@Injectable()
export class FindAppBySlugRepository
  implements IBaseRepository<string, Promise<AppModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(slug: string): Promise<AppModel> {
    return new AppMapper().toModel(
      await this.model.app.findFirst({
        where: { slug }
      })
    );
  }
}
