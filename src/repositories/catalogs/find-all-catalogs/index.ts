import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCatalogsDTO } from '@/dtos/catalogs/find-all-catalogs.dto';
import { CatalogMapper } from '@/mappers/catalogs';
import { CatalogModel } from '@/models/catalog.model';

@Injectable()
export class FindAllCatalogsRepository
  implements IBaseRepository<FindAllCatalogsDTO, Promise<CatalogModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCatalogsDTO): Promise<CatalogModel[]> {
    const catalogMapper = new CatalogMapper();
    return catalogMapper.toModels(
      await this.model.catalog.findMany(catalogMapper.toFindAllPrisma(data))
    );
  }
}
