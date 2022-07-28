import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountCurrenciesDTO } from '@/dtos/currencies/count-currencies.dto';
import { CurrencyMapper } from '@/mappers/currencies';

@Injectable()
export class CountCurrenciesRepository
  implements IBaseRepository<CountCurrenciesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountCurrenciesDTO): Promise<number> {
    const currencyMapper = new CurrencyMapper();
    return await this.model.currency.count({
      where: currencyMapper.toWhereFindAllPrisma(where)
    });
  }
}
