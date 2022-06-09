import { FindAllCurrenciesQueryHandler } from './find-all-currencies';
import { FindCurrencyByIdQueryHandler } from './find-currency-by-id';

export const CurrencyQueriesHandlers = [
  FindCurrencyByIdQueryHandler,
  FindAllCurrenciesQueryHandler
];
