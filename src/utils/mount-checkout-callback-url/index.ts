import { URL } from 'url';

import { CHECKOUT_RESPONSE_URL } from '@/environments';

export const mountCheckoutCallbackURL = ({
  success,
  domain
}: {
  success: boolean;
  domain?: string;
}) => {
  const url = new URL(domain || CHECKOUT_RESPONSE_URL);
  url.pathname = '/checkout/callback';
  url.searchParams.set('success', success + '');
  if (success) {
    url.searchParams.set('checkoutSessionId', '{CHECKOUT_SESSION_ID}');
  }
  return url.toString();
};
