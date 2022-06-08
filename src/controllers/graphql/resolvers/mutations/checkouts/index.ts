import { CreateCheckoutResolver } from './create-checkout';
import { RemoveCheckoutResolver } from './remove-checkout';
import { UpdateCheckoutResolver } from './update-checkout';

export const CheckoutsMutations = [
  CreateCheckoutResolver,
  RemoveCheckoutResolver,
  UpdateCheckoutResolver
];
