import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
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
