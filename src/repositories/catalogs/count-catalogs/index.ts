import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountCatalogsDTO } from '@/dtos/catalogs/count-catalogs.dto';
import { CatalogMapper } from '@/mappers/catalogs';

@Injectable()
export class CountCatalogsRepository
  implements IBaseRepository<CountCatalogsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountCatalogsDTO): Promise<number> {
    const catalogMapper = new CatalogMapper();
    return await this.model.catalog.count({
      where: catalogMapper.toWhereFindAllPrisma(where)
    });
  }
}
