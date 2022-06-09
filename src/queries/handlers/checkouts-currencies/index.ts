import { FindAllCheckoutsCurrenciesQueryHandler } from './find-all-checkouts-currencies';
import { FindCheckoutsCurrencyByIdQueryHandler } from './find-checkouts-currency-by-id';

export const CheckoutsCurrencyQueriesHandlers = [
  FindCheckoutsCurrencyByIdQueryHandler,
  FindAllCheckoutsCurrenciesQueryHandler
];
