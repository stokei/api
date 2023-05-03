import { ActivatePriceResolver } from './activate-price';
import { CreatePriceResolver } from './create-price';
import { DeactivatePriceResolver } from './deactivate-price';
import { UpdatePriceResolver } from './update-price';

export const PricesMutations = [
  CreatePriceResolver,
  UpdatePriceResolver,
  ActivatePriceResolver,
  DeactivatePriceResolver
];
