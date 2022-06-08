import { CreatePriceCommandHandler } from './create-price';
import { RemovePriceCommandHandler } from './remove-price';
import { UpdatePriceCommandHandler } from './update-price';

export const PriceCommandHandlers = [
  CreatePriceCommandHandler,
  RemovePriceCommandHandler,
  UpdatePriceCommandHandler
];
