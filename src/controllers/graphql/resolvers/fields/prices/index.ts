import { PriceAppResolver } from './app';
import { PriceCreatedByResolver } from './created-by';
import { PriceCurrencyResolver } from './currency';
import { PriceReferenceResolver } from './reference';
import { PriceUpdatedByResolver } from './updated-by';

export const PricesFieldsResolvers = [
  PriceReferenceResolver,
  PriceAppResolver,
  PriceCurrencyResolver,
  PriceCreatedByResolver,
  PriceUpdatedByResolver
];
