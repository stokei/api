import { ActivatePriceCommandHandler } from './activate-price';
import { CreatePriceCommandHandler } from './create-price';
import { DeactivatePriceCommandHandler } from './deactivate-price';
import { RemovePriceCommandHandler } from './remove-price';
import { UpdatePriceCommandHandler } from './update-price';

export const PriceCommandHandlers = [
  CreatePriceCommandHandler,
  RemovePriceCommandHandler,
  UpdatePriceCommandHandler,
  ActivatePriceCommandHandler,
  DeactivatePriceCommandHandler
];
