import { CreateCheckoutsCurrencyCommandHandler } from './create-checkouts-currency';
import { RemoveCheckoutsCurrencyCommandHandler } from './remove-checkouts-currency';
import { UpdateCheckoutsCurrencyCommandHandler } from './update-checkouts-currency';

export const CheckoutsCurrencyCommandHandlers = [
  CreateCheckoutsCurrencyCommandHandler,
  RemoveCheckoutsCurrencyCommandHandler,
  UpdateCheckoutsCurrencyCommandHandler
];
