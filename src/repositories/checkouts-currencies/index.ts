import { CountCheckoutsCurrenciesRepository } from './count-checkouts-currencies';
import { CreateCheckoutsCurrencyRepository } from './create-checkouts-currency';
import { ExistsCheckoutsCurrenciesRepository } from './exists-checkouts-currencies';
import { FindCheckoutsCurrencyByIdRepository } from './find-checkouts-currency-by-id';
import { FindAllCheckoutsCurrenciesRepository } from './find-all-checkouts-currencies';
import { RemoveCheckoutsCurrencyRepository } from './remove-checkouts-currency';
import { UpdateCheckoutsCurrencyRepository } from './update-checkouts-currency';

export const CheckoutsCurrenciesRepositories = [
  CountCheckoutsCurrenciesRepository,
  CreateCheckoutsCurrencyRepository,
  ExistsCheckoutsCurrenciesRepository,
  FindCheckoutsCurrencyByIdRepository,
  FindAllCheckoutsCurrenciesRepository,
  RemoveCheckoutsCurrencyRepository,
  UpdateCheckoutsCurrencyRepository
];
