import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllSitesDTO } from '@/dtos/sites/find-all-sites.dto';
import { SiteMapper } from '@/mappers/sites';
import { SiteModel } from '@/models/site.model';

@Injectable()
export class FindAllSitesRepository
  implements IBaseRepository<FindAllSitesDTO, Promise<SiteModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllSitesDTO): Promise<SiteModel[]> {
    const siteMapper = new SiteMapper();
    return siteMapper.toModels(
      await this.model.site.findMany(siteMapper.toFindAllPrisma(data))
    );
  }
}
