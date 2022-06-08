import { CreateCurrencyResolver } from './create-currency';
import { RemoveCurrencyResolver } from './remove-currency';
import { UpdateCurrencyResolver } from './update-currency';

export const CurrenciesMutations = [
  CreateCurrencyResolver,
  RemoveCurrencyResolver,
  UpdateCurrencyResolver
];
