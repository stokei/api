import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCurrenciesService } from '@/services/currencies/find-all-currencies';

@Injectable({ scope: Scope.REQUEST })
export class CurrenciesLoader {
  constructor(private readonly currenciesService: FindAllCurrenciesService) {}

  readonly findByIds = new DataLoader(async (currencyIds: string[]) => {
    const currencies = await this.currenciesService.execute({
      where: {
        AND: {
          ids: currencyIds
        }
      }
    });
    const currenciesMap = new Map(
      currencies?.items?.map((currency) => [currency.id, currency])
    );
    return currencyIds.map((currencyId) => currenciesMap.get(currencyId));
  });
}
