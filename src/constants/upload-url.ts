import { SERVER_URL } from '@/environments';
import { appendPathnameToURL } from '@/utils/append-pathname-to-url';

import { REST_CONTROLLERS_URL_NAMES } from './rest-controllers';
import { REST_VERSIONS } from './rest-versions';

export const LOCAL_UPLOAD_URL_PATHNAME =
  '/' + REST_VERSIONS.V1_TEXT + '/' + REST_CONTROLLERS_URL_NAMES.UPLOADS;

export const LOCAL_UPLOAD_URL = appendPathnameToURL(
  SERVER_URL,
  LOCAL_UPLOAD_URL_PATHNAME
);
