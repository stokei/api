import { CountCurrenciesRepository } from './count-currencies';
import { CreateCurrencyRepository } from './create-currency';
import { ExistsCurrenciesRepository } from './exists-currencies';
import { FindAllCurrenciesRepository } from './find-all-currencies';
import { FindCurrencyByIdRepository } from './find-currency-by-id';
import { RemoveCurrencyRepository } from './remove-currency';
import { UpdateCurrencyRepository } from './update-currency';

export const CurrenciesRepositories = [
  CountCurrenciesRepository,
  CreateCurrencyRepository,
  ExistsCurrenciesRepository,
  FindCurrencyByIdRepository,
  FindAllCurrenciesRepository,
  RemoveCurrencyRepository,
  UpdateCurrencyRepository
];
