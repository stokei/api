import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCurrenciesDTO } from '@/dtos/currencies/find-all-currencies.dto';
import { CurrencyMapper } from '@/mappers/currencies';
import { CurrencyModel } from '@/models/currency.model';

@Injectable()
export class FindAllCurrenciesRepository
  implements IBaseRepository<FindAllCurrenciesDTO, Promise<CurrencyModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCurrenciesDTO): Promise<CurrencyModel[]> {
    const currencyMapper = new CurrencyMapper();
    return currencyMapper.toModels(
      await this.model.currency.findMany(currencyMapper.toFindAllPrisma(data))
    );
  }
}
