import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountPriceTiersDTO } from '@/dtos/price-tiers/count-price-tiers.dto';
import { PriceTierMapper } from '@/mappers/price-tiers';

@Injectable()
export class CountPriceTiersRepository
  implements IBaseRepository<CountPriceTiersDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountPriceTiersDTO): Promise<number> {
    const priceTierMapper = new PriceTierMapper();
    return await this.model.priceTier.count({
      where: priceTierMapper.toWhereFindAllPrisma(where)
    });
  }
}
