import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePriceTierDTO } from '@/dtos/price-tiers/create-price-tier.dto';
import { PriceTierMapper } from '@/mappers/price-tiers';
import { PriceTierModel } from '@/models/price-tier.model';

@Injectable()
export class CreatePriceTierRepository
  implements IBaseRepository<CreatePriceTierDTO, Promise<PriceTierModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePriceTierDTO): Promise<PriceTierModel> {
    return new PriceTierMapper().toModel(
      await this.model.priceTier.create({ data })
    );
  }
}
