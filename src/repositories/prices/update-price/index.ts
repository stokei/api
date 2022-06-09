import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdatePriceDTO } from '@/dtos/prices/update-price.dto';

@Injectable()
export class UpdatePriceRepository
  implements IBaseRepository<UpdatePriceDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdatePriceDTO): Promise<boolean> {
    const updated = await this.model.price.update({
      where: {
        id: where?.priceId
      },
      data
    });
    return !!updated;
  }
}
