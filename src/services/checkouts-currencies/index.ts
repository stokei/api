import { CreateCheckoutsCurrencyService } from './create-checkouts-currency';
import { FindAllCheckoutsCurrenciesService } from './find-all-checkouts-currencies';
import { FindCheckoutsCurrencyByIdService } from './find-checkouts-currency-by-id';
import { RemoveCheckoutsCurrencyService } from './remove-checkouts-currency';
import { UpdateCheckoutsCurrencyService } from './update-checkouts-currency';

export const CheckoutsCurrencyServices = [
  CreateCheckoutsCurrencyService,
  RemoveCheckoutsCurrencyService,
  UpdateCheckoutsCurrencyService,
  FindCheckoutsCurrencyByIdService,
  FindAllCheckoutsCurrenciesService
];
