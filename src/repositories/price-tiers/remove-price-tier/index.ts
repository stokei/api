import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemovePriceTierDTO } from '@/dtos/price-tiers/remove-price-tier.dto';

@Injectable()
export class RemovePriceTierRepository
  implements IBaseRepository<RemovePriceTierDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemovePriceTierDTO): Promise<boolean> {
    const removed = await this.model.priceTier.delete({
      where: {
        id: where?.priceTier
      }
    });
    return !!removed;
  }
}
