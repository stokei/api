import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllPriceTiersDTO } from '@/dtos/price-tiers/find-all-price-tiers.dto';
import { PriceTierMapper } from '@/mappers/price-tiers';
import { PriceTierModel } from '@/models/price-tier.model';

@Injectable()
export class FindAllPriceTiersRepository
  implements IBaseRepository<FindAllPriceTiersDTO, Promise<PriceTierModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllPriceTiersDTO): Promise<PriceTierModel[]> {
    const priceTierMapper = new PriceTierMapper();
    return priceTierMapper.toModels(
      await this.model.priceTier.findMany(priceTierMapper.toFindAllPrisma(data))
    );
  }
}
