import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCatalogDTO } from '@/dtos/catalogs/create-catalog.dto';
import { CatalogMapper } from '@/mappers/catalogs';
import { CatalogModel } from '@/models/catalog.model';

@Injectable()
export class CreateCatalogRepository
  implements IBaseRepository<CreateCatalogDTO, Promise<CatalogModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCatalogDTO): Promise<CatalogModel> {
    return new CatalogMapper().toModel(
      await this.model.catalog.create({ data })
    );
  }
}
