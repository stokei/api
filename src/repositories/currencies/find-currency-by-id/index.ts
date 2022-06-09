import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CurrencyMapper } from '@/mappers/currencies';
import { CurrencyModel } from '@/models/currency.model';

@Injectable()
export class FindCurrencyByIdRepository
  implements IBaseRepository<string, Promise<CurrencyModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CurrencyModel> {
    return new CurrencyMapper().toModel(
      await this.model.currency.findUnique({
        where: { id }
      })
    );
  }
}
