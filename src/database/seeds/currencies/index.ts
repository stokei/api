import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IBaseService } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { CreateCurrencyDTO } from '@/dtos/currencies/create-currency.dto';
import { CurrencyModel } from '@/models/currency.model';
import { CreateCurrencyService } from '@/services/currencies/create-currency';
import { FindAllCurrenciesService } from '@/services/currencies/find-all-currencies';

type CurrencyDataDTO = CreateCurrencyDTO;

@Injectable()
export class CurrenciesSeeds
  implements IBaseService<any, Promise<CurrencyModel[]>>
{
  constructor(
    private readonly createCurrencyService: CreateCurrencyService,
    private readonly findAllCurrenciesService: FindAllCurrenciesService
  ) {}

  async execute(): Promise<CurrencyModel[]> {
    const currenciesData = this.createData();
    const currenciesIds = currenciesData.map((currency) => currency.id);
    const currenciesFounded = await this.findAllCurrenciesService.execute({
      where: {
        AND: {
          ids: currenciesIds
        }
      }
    });
    let currenciesToCreate = currenciesData;
    if (currenciesFounded?.items?.length > 0) {
      currenciesToCreate = currenciesData?.filter((currency) => {
        const existsLanguage = currenciesFounded?.items?.find(
          (currencyFounded) => currencyFounded.id === currency.id
        );
        return !existsLanguage;
      });
    }
    const prismaClient = new PrismaClient();
    const currenciesCreated = await Promise.all(
      currenciesToCreate?.map(async (currencyData) => {
        const currency = await this.createCurrencyService.execute(currencyData);
        return currency;
      })
    );
    prismaClient.$disconnect();
    return [...currenciesFounded?.items, ...currenciesCreated];
  }

  private createData(): CurrencyDataDTO[] {
    return [
      {
        id: 'BRL',
        name: 'Real',
        symbol: 'R$',
        minorUnit: 2,
        createdBy: defaultAccountId
      }
    ];
  }
}
