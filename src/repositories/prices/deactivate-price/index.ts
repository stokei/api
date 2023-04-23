import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { DeactivatePriceDTO } from '@/dtos/prices/deactivate-price.dto';

@Injectable()
export class DeactivatePriceRepository
  implements IBaseRepository<DeactivatePriceDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: DeactivatePriceDTO): Promise<boolean> {
    const updated = await this.model.price.update({
      where: {
        id: data?.price
      },
      data: {
        active: false
      }
    });
    return !!updated;
  }
}
