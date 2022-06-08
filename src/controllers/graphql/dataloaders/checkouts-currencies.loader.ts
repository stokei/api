import { Injectable, Scope } from '@nestjs/common';
import { FindAllCheckoutsCurrenciesService } from '@/services/checkouts-currencies/find-all-checkouts-currencies';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class CheckoutsCurrenciesLoader {
  constructor(
    private readonly checkoutsCurrenciesService: FindAllCheckoutsCurrenciesService
  ) {}

  readonly findByIds = new DataLoader(
    async (checkoutsCurrencyIds: string[]) => {
      const checkoutsCurrencies = await this.checkoutsCurrenciesService.execute(
        {
          where: {
            AND: {
              ids: checkoutsCurrencyIds
            }
          }
        }
      );
      const checkoutsCurrenciesMap = new Map(
        checkoutsCurrencies?.items?.map((checkoutsCurrency) => [
          checkoutsCurrency.id,
          checkoutsCurrency
        ])
      );
      return checkoutsCurrencyIds.map((checkoutsCurrencyId) =>
        checkoutsCurrenciesMap.get(checkoutsCurrencyId)
      );
    }
  );
}
