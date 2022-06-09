import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { SitesLightColorMapper } from '@/mappers/sites-light-colors';
import { SitesLightColorModel } from '@/models/sites-light-color.model';

@Injectable()
export class FindSitesLightColorByIdRepository
  implements IBaseRepository<string, Promise<SitesLightColorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<SitesLightColorModel> {
    return new SitesLightColorMapper().toModel(
      await this.model.sitesLightColor.findUnique({
        where: { id }
      })
    );
  }
}
