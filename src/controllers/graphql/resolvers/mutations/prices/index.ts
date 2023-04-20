import { ActivatePriceResolver } from './activate-price';
import { CreatePriceResolver } from './create-price';
import { DeactivatePriceResolver } from './deactivate-price';
import { RemovePriceResolver } from './remove-price';
import { UpdatePriceResolver } from './update-price';

export const PricesMutations = [
  CreatePriceResolver,
  RemovePriceResolver,
  UpdatePriceResolver,
  ActivatePriceResolver,
  DeactivatePriceResolver
];
