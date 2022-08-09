import { CurrencyCreatedByResolver } from './created-by';
import { CurrencyReferenceResolver } from './reference';
import { CurrencyUpdatedByResolver } from './updated-by';

export const CurrenciesFieldsResolvers = [
  CurrencyReferenceResolver,
  CurrencyCreatedByResolver,
  CurrencyUpdatedByResolver
];
