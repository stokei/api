import { CreateCheckoutCommandHandler } from './create-checkout';
import { CreatePagarmeCheckoutCommandHandler } from './create-pagarme-checkout';

export const CheckoutCommandHandlers = [
  CreateCheckoutCommandHandler,
  CreatePagarmeCheckoutCommandHandler
];
