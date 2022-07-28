import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountPricesDTO } from '@/dtos/prices/count-prices.dto';
import { PriceMapper } from '@/mappers/prices';

@Injectable()
export class CountPricesRepository
  implements IBaseRepository<CountPricesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountPricesDTO): Promise<number> {
    const priceMapper = new PriceMapper();
    return await this.model.price.count({
      where: priceMapper.toWhereFindAllPrisma(where)
    });
  }
}
