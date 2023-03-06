import { Injectable } from '@nestjs/common';
import { IBaseService } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { CreateCurrencyDTO } from '@/dtos/currencies/create-currency.dto';
import { CreateCurrencyService } from '@/services/currencies/create-currency';
import { FindAllCurrenciesService } from '@/services/currencies/find-all-currencies';

import { BaseSeeds } from '../base-seeds';

type CurrencyDataDTO = CreateCurrencyDTO;

@Injectable()
export class CurrenciesSeeds
  extends BaseSeeds
  implements IBaseService<any, Promise<void>>
{
  constructor(
    private readonly createCurrencyService: CreateCurrencyService,
    private readonly findAllCurrenciesService: FindAllCurrenciesService
  ) {
    super();
  }

  async execute(): Promise<void> {
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

    currenciesToCreate?.forEach(async (currencyData) => {
      const currency = await this.createCurrencyService.execute(currencyData);
      return currency;
    });
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
