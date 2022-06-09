import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { SitesDarkColorMapper } from '@/mappers/sites-dark-colors';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';

@Injectable()
export class FindSitesDarkColorByIdRepository
  implements IBaseRepository<string, Promise<SitesDarkColorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<SitesDarkColorModel> {
    return new SitesDarkColorMapper().toModel(
      await this.model.sitesDarkColor.findUnique({
        where: { id }
      })
    );
  }
}
