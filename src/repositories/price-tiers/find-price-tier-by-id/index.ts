import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { PriceTierMapper } from '@/mappers/price-tiers';
import { PriceTierModel } from '@/models/price-tier.model';

@Injectable()
export class FindPriceTierByIdRepository
  implements IBaseRepository<string, Promise<PriceTierModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<PriceTierModel> {
    return new PriceTierMapper().toModel(
      await this.model.priceTier.findUnique({
        where: { id }
      })
    );
  }
}
