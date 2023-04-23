import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ActivatePriceDTO } from '@/dtos/prices/activate-price.dto';

@Injectable()
export class ActivatePriceRepository
  implements IBaseRepository<ActivatePriceDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: ActivatePriceDTO): Promise<boolean> {
    const updated = await this.model.price.update({
      where: {
        id: data?.price
      },
      data: {
        active: true
      }
    });
    return !!updated;
  }
}
