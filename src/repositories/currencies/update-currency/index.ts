import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateCurrencyDTO } from '@/dtos/currencies/update-currency.dto';

@Injectable()
export class UpdateCurrencyRepository
  implements IBaseRepository<UpdateCurrencyDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCurrencyDTO): Promise<boolean> {
    const updated = await this.model.currency.update({
      where: {
        id: where?.currencyId
      },
      data
    });
    return !!updated;
  }
}
