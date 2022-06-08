import { CreateCheckoutCommandHandler } from './create-checkout';
import { RemoveCheckoutCommandHandler } from './remove-checkout';
import { UpdateCheckoutCommandHandler } from './update-checkout';

export const CheckoutCommandHandlers = [
  CreateCheckoutCommandHandler,
  RemoveCheckoutCommandHandler,
  UpdateCheckoutCommandHandler
];
