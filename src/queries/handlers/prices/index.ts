import { CalculatePricesInformationQueryHandler } from './calculate-prices-information';
import { FindAllPricesQueryHandler } from './find-all-prices';
import { FindPriceByIdQueryHandler } from './find-price-by-id';
import { FindPricesByStripePriceIdsQueryHandler } from './find-prices-by-stripe-price-ids';

export const PriceQueriesHandlers = [
  FindPriceByIdQueryHandler,
  FindAllPricesQueryHandler,
  CalculatePricesInformationQueryHandler,
  FindPricesByStripePriceIdsQueryHandler
];
