import { URL } from 'url';

import { CHECKOUT_RESPONSE_URL } from '@/environments';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

export const mountCheckoutCallbackURL = ({
  success,
  domain
}: {
  success: boolean;
  domain?: string;
}) => {
  const url = new URL(
    appendPathnameToURL(domain || CHECKOUT_RESPONSE_URL, '/checkout/callback')
  );
  url.searchParams.set('success', success + '');
  if (success) {
    url.searchParams.set('checkoutSessionId', '{CHECKOUT_SESSION_ID}');
  }
  return url.toString();
};
