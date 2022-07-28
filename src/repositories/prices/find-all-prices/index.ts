import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllPricesDTO } from '@/dtos/prices/find-all-prices.dto';
import { PriceMapper } from '@/mappers/prices';
import { PriceModel } from '@/models/price.model';

@Injectable()
export class FindAllPricesRepository
  implements IBaseRepository<FindAllPricesDTO, Promise<PriceModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllPricesDTO): Promise<PriceModel[]> {
    const priceMapper = new PriceMapper();
    return priceMapper.toModels(
      await this.model.price.findMany(priceMapper.toFindAllPrisma(data))
    );
  }
}
