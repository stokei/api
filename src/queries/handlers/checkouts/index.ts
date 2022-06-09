import { FindAllCheckoutsQueryHandler } from './find-all-checkouts';
import { FindCheckoutByIdQueryHandler } from './find-checkout-by-id';

export const CheckoutQueriesHandlers = [
  FindCheckoutByIdQueryHandler,
  FindAllCheckoutsQueryHandler
];
