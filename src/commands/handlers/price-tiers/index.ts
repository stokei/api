import { CreatePriceTierCommandHandler } from './create-price-tier';
import { RemovePriceTierCommandHandler } from './remove-price-tier';
import { UpdatePriceTierCommandHandler } from './update-price-tier';

export const PriceTierCommandHandlers = [
  CreatePriceTierCommandHandler,
  RemovePriceTierCommandHandler,
  UpdatePriceTierCommandHandler
];
