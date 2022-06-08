import { CreateCheckoutsCurrencyResolver } from './create-checkouts-currency';
import { RemoveCheckoutsCurrencyResolver } from './remove-checkouts-currency';
import { UpdateCheckoutsCurrencyResolver } from './update-checkouts-currency';

export const CheckoutsCurrenciesMutations = [
  CreateCheckoutsCurrencyResolver,
  RemoveCheckoutsCurrencyResolver,
  UpdateCheckoutsCurrencyResolver
];
