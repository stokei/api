import { CreateCheckoutService } from './create-checkout';
import { FindAllCheckoutsService } from './find-all-checkouts';
import { FindCheckoutByIdService } from './find-checkout-by-id';
import { RemoveCheckoutService } from './remove-checkout';
import { UpdateCheckoutService } from './update-checkout';

export const CheckoutServices = [
  CreateCheckoutService,
  RemoveCheckoutService,
  UpdateCheckoutService,
  FindCheckoutByIdService,
  FindAllCheckoutsService
];
