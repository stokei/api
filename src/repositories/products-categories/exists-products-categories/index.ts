import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsProductsCategoriesDTO } from '@/dtos/products-categories/exists-products-categories.dto';

@Injectable()
export class ExistsProductsCategoriesRepository
  implements IBaseRepository<ExistsProductsCategoriesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsProductsCategoriesDTO): Promise<boolean> {
    return (await this.model.productsCategory.count({ where })) > 0;
  }
}
