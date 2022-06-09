import { CreateCurrencyService } from './create-currency';
import { FindAllCurrenciesService } from './find-all-currencies';
import { FindCurrencyByIdService } from './find-currency-by-id';
import { RemoveCurrencyService } from './remove-currency';
import { UpdateCurrencyService } from './update-currency';

export const CurrencyServices = [
  CreateCurrencyService,
  RemoveCurrencyService,
  UpdateCurrencyService,
  FindCurrencyByIdService,
  FindAllCurrenciesService
];
