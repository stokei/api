import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdatePriceTierDTO } from '@/dtos/price-tiers/update-price-tier.dto';

@Injectable()
export class UpdatePriceTierRepository
  implements IBaseRepository<UpdatePriceTierDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdatePriceTierDTO): Promise<boolean> {
    const updated = await this.model.priceTier.update({
      where: {
        id: where?.priceTier
      },
      data
    });
    return !!updated;
  }
}
