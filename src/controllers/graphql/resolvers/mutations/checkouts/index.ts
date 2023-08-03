import { CreateCheckoutResolver } from './create-checkout';
import { CreatePixCheckoutResolver } from './create-pix-checkout';
import { SubscribeProductResolver } from './subscribe-product';

export const CheckoutsMutations = [
  CreateCheckoutResolver,
  SubscribeProductResolver,
  CreatePixCheckoutResolver
];
