import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { CurrencyMapper } from '@/mappers/currencies';
import { CreateCurrencyDTO } from '@/dtos/currencies/create-currency.dto';
import { CurrencyModel } from '@/models/currency.model';

@Injectable()
export class CreateCurrencyRepository
  implements IBaseRepository<CreateCurrencyDTO, Promise<CurrencyModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCurrencyDTO): Promise<CurrencyModel> {
    return new CurrencyMapper().toModel(
      await this.model.currency.create({ data })
    );
  }
}
