import { FindCheckoutByIdService } from './find-checkout-by-id';
import { FindAllCheckoutsService } from './find-all-checkouts';
import { CreateCheckoutService } from './create-checkout';
import { RemoveCheckoutService } from './remove-checkout';
import { UpdateCheckoutService } from './update-checkout';

export const CheckoutServices = [
  CreateCheckoutService,
  RemoveCheckoutService,
  UpdateCheckoutService,
  FindCheckoutByIdService,
  FindAllCheckoutsService
];
