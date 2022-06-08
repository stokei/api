import { CreateCurrencyCommandHandler } from './create-currency';
import { RemoveCurrencyCommandHandler } from './remove-currency';
import { UpdateCurrencyCommandHandler } from './update-currency';

export const CurrencyCommandHandlers = [
  CreateCurrencyCommandHandler,
  RemoveCurrencyCommandHandler,
  UpdateCurrencyCommandHandler
];
