import { Injectable } from '@nestjs/common';
import { IBaseRepository, PrismaMapper } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { PriceMapper } from '@/mappers/prices';
import { PriceModel } from '@/models/price.model';

@Injectable()
export class FindPricesByStripePriceIdsRepository
  implements IBaseRepository<string[], Promise<PriceModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(ids: string[]): Promise<PriceModel[]> {
    const prismaMapper = new PrismaMapper();
    return new PriceMapper().toModels(
      await this.model.price.findMany({
        where: { stripePrice: prismaMapper.toWhereIds(ids) }
      })
    );
  }
}
