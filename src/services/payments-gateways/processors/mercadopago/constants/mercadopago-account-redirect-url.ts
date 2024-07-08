import { REST_CONTROLLERS_URL_NAMES } from '@/constants/rest-controllers';
import { REST_VERSIONS } from '@/constants/rest-versions';
import { SERVER_URL } from '@/environments';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

export const mercadopagoAccountRedirectURL = appendPathnameToURL(
  SERVER_URL,
  appendPathnameToURL(
    REST_VERSIONS.V1_TEXT,
    REST_CONTROLLERS_URL_NAMES.PAYMENT_GATEWAYS.MERCADOPAGO.COMPLETE_ACCOUNT
  )
);
