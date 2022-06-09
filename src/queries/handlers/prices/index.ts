import { FindAllPricesQueryHandler } from './find-all-prices';
import { FindPriceByIdQueryHandler } from './find-price-by-id';

export const PriceQueriesHandlers = [
  FindPriceByIdQueryHandler,
  FindAllPricesQueryHandler
];
