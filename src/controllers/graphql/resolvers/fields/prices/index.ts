import { PriceAmountResolver } from './amount';
import { PriceAppResolver } from './app';
import { PriceCreatedByResolver } from './created-by';
import { PriceCurrencyResolver } from './currency';
import { PriceDiscountPercentResolver } from './discount-percent';
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
  PricePriceTiersResolver,
  PriceDiscountPercentResolver,
  PriceAmountResolver
];
