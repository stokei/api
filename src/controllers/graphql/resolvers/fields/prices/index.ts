import { PriceAppResolver } from './app';
import { PriceCreatedByResolver } from './created-by';
import { PriceCurrencyResolver } from './currency';
import { PriceRecurringResolver } from './recurring';
import { PriceReferenceResolver } from './reference';
import { PricePriceTiersResolver } from './tiers';
import { PriceUpdatedByResolver } from './updated-by';

export const PricesFieldsResolvers = [
  PriceReferenceResolver,
  PriceAppResolver,
  PriceCurrencyResolver,
  PriceCreatedByResolver,
  PriceUpdatedByResolver,
  PriceRecurringResolver,
  PricePriceTiersResolver
];
