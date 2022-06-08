import { CreatePriceResolver } from './create-price';
import { RemovePriceResolver } from './remove-price';
import { UpdatePriceResolver } from './update-price';

export const PricesMutations = [
  CreatePriceResolver,
  RemovePriceResolver,
  UpdatePriceResolver
];
