import { ConfirmCheckoutCommandHandler } from './confirm-checkout';
import { CreateCheckoutCommandHandler } from './create-checkout';

export const CheckoutCommandHandlers = [
  CreateCheckoutCommandHandler,
  ConfirmCheckoutCommandHandler
];
