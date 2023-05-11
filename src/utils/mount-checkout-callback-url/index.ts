import { URL } from 'url';

import { CHECKOUT_RESPONSE_URL } from '@/environments';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

export const mountCheckoutCallbackURL = ({
  product,
  success,
  domain
}: {
  success: boolean;
  product: string;
  domain?: string;
}) => {
  if (!success) {
    const url = new URL(
      appendPathnameToURL(
        domain || CHECKOUT_RESPONSE_URL,
        '/checkout/' + product
      )
    );
    return decodeURI(url.toString());
  }
  const url = new URL(
    appendPathnameToURL(
      domain || CHECKOUT_RESPONSE_URL,
      '/checkout/' + product + '/callback'
    )
  );
  url.searchParams.set('success', success + '');
  if (success) {
    url.searchParams.set('checkoutSessionId', '{CHECKOUT_SESSION_ID}');
  }
  return decodeURI(url.toString());
};
