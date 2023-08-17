import { CreatePagarmeCheckoutCommandHandler } from './create-pagarme-checkout';
import { CreateStripeCheckoutCommandHandler } from './create-stripe-checkout';

export const CheckoutCommandHandlers = [
  CreateStripeCheckoutCommandHandler,
  CreatePagarmeCheckoutCommandHandler
];
