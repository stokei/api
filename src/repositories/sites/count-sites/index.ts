import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountSitesDTO } from '@/dtos/sites/count-sites.dto';
import { SiteMapper } from '@/mappers/sites';

@Injectable()
export class CountSitesRepository
  implements IBaseRepository<CountSitesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountSitesDTO): Promise<number> {
    const siteMapper = new SiteMapper();
    return await this.model.site.count({
      where: siteMapper.toWhereFindAllPrisma(where)
    });
  }
}
