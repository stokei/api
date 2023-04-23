import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CatalogMapper } from '@/mappers/catalogs';
import { CatalogModel } from '@/models/catalog.model';

@Injectable()
export class FindCatalogByIdRepository
  implements IBaseRepository<string, Promise<CatalogModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CatalogModel> {
    return new CatalogMapper().toModel(
      await this.model.catalog.findUnique({
        where: { id }
      })
    );
  }
}
