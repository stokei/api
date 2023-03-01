import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCatalogItemsDTO } from '@/dtos/catalog-items/exists-catalog-items.dto';

@Injectable()
export class ExistsCatalogItemsRepository
  implements IBaseRepository<ExistsCatalogItemsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCatalogItemsDTO): Promise<boolean> {
    return (await this.model.catalogItem.count({ where })) > 0;
  }
}
