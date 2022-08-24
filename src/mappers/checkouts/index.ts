import Stripe from 'stripe';

import { CheckoutModel } from '@/models/checkout.model';

export class CheckoutMapper {
  toModel(checkout: Stripe.Checkout.Session) {
    return checkout && new CheckoutModel(checkout);
  }
  toModels(checkouts: Stripe.Checkout.Session[]) {
    return checkouts?.length > 0
      ? checkouts.map(this.toModel).filter(Boolean)
      : [];
  }
}
