import { convertToISODateString } from '@stokei/nestjs';

import { CheckoutsCurrencyEntity } from '@/entities';
import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';

export class CheckoutsCurrencyMapper {
  toModel(checkoutsCurrency: CheckoutsCurrencyEntity) {
    return (
      checkoutsCurrency &&
      new CheckoutsCurrencyModel({
        ...checkoutsCurrency,
        updatedAt: convertToISODateString(checkoutsCurrency.updatedAt),
        createdAt: convertToISODateString(checkoutsCurrency.createdAt)
      })
    );
  }
  toModels(checkoutsCurrencies: CheckoutsCurrencyEntity[]) {
    return checkoutsCurrencies?.length > 0
      ? checkoutsCurrencies.map(this.toModel).filter(Boolean)
      : [];
  }
}
