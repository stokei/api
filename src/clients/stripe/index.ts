import Stripe from 'stripe';

import { STRIPE_SECRET_KEY } from '@/environments';

export const stripeClient = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
  typescript: true
});
