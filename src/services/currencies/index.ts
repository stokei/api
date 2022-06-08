import { FindCurrencyByIdService } from './find-currency-by-id';
import { FindAllCurrenciesService } from './find-all-currencies';
import { CreateCurrencyService } from './create-currency';
import { RemoveCurrencyService } from './remove-currency';
import { UpdateCurrencyService } from './update-currency';

export const CurrencyServices = [
  CreateCurrencyService,
  RemoveCurrencyService,
  UpdateCurrencyService,
  FindCurrencyByIdService,
  FindAllCurrenciesService
];
