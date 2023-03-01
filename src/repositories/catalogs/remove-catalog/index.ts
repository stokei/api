import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveCatalogDTO } from '@/dtos/catalogs/remove-catalog.dto';

@Injectable()
export class RemoveCatalogRepository
  implements IBaseRepository<RemoveCatalogDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCatalogDTO): Promise<boolean> {
    const removed = await this.model.catalog.delete({
      where: {
        id: where?.catalog
      }
    });
    return !!removed;
  }
}
