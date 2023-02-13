import { CreateCheckoutResolver } from './create-checkout';
import { SubscribeProductResolver } from './subscribe-product';

export const CheckoutsMutations = [
  CreateCheckoutResolver,
  SubscribeProductResolver
];
