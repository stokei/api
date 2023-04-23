import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateCatalogDTO } from '@/dtos/catalogs/update-catalog.dto';

@Injectable()
export class UpdateCatalogRepository
  implements IBaseRepository<UpdateCatalogDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCatalogDTO): Promise<boolean> {
    const updated = await this.model.catalog.update({
      where: {
        id: where?.catalog
      },
      data
    });
    return !!updated;
  }
}
