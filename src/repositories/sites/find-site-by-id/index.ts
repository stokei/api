import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { SiteMapper } from '@/mappers/sites';
import { SiteModel } from '@/models/site.model';

@Injectable()
export class FindSiteByIdRepository
  implements IBaseRepository<string, Promise<SiteModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<SiteModel> {
    return new SiteMapper().toModel(
      await this.model.site.findUnique({
        where: { id }
      })
    );
  }
}
