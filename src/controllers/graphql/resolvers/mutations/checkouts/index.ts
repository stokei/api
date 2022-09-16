import { ConfirmCheckoutResolver } from './confirm-checkout';
import { CreateCheckoutResolver } from './create-checkout';

export const CheckoutsMutations = [
  CreateCheckoutResolver,
  ConfirmCheckoutResolver
];
