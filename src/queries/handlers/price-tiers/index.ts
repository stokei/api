import { FindAllPriceTiersQueryHandler } from './find-all-price-tiers';
import { FindPriceTierByIdQueryHandler } from './find-price-tier-by-id';

export const PriceTierQueriesHandlers = [
  FindPriceTierByIdQueryHandler,
  FindAllPriceTiersQueryHandler
];
