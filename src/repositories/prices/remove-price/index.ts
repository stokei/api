import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemovePriceDTO } from '@/dtos/prices/remove-price.dto';

@Injectable()
export class RemovePriceRepository
  implements IBaseRepository<RemovePriceDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemovePriceDTO): Promise<boolean> {
    const removed = await this.model.price.delete({
      where: {
        id: where?.priceId
      }
    });
    return !!removed;
  }
}
