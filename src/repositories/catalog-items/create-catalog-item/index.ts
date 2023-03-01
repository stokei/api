import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCatalogItemDTO } from '@/dtos/catalog-items/create-catalog-item.dto';
import { CatalogItemMapper } from '@/mappers/catalog-items';
import { CatalogItemModel } from '@/models/catalog-item.model';

@Injectable()
export class CreateCatalogItemRepository
  implements IBaseRepository<CreateCatalogItemDTO, Promise<CatalogItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCatalogItemDTO): Promise<CatalogItemModel> {
    return new CatalogItemMapper().toModel(
      await this.model.catalogItem.create({ data })
    );
  }
}
