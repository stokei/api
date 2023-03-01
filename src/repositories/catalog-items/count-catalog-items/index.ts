import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountCatalogItemsDTO } from '@/dtos/catalog-items/count-catalog-items.dto';
import { CatalogItemMapper } from '@/mappers/catalog-items';

@Injectable()
export class CountCatalogItemsRepository
  implements IBaseRepository<CountCatalogItemsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountCatalogItemsDTO): Promise<number> {
    const catalogItemMapper = new CatalogItemMapper();
    return await this.model.catalogItem.count({
      where: catalogItemMapper.toWhereFindAllPrisma(where)
    });
  }
}
