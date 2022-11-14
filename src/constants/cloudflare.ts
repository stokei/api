import {
  CLOUDFLARE_ACCOUNT,
  CLOUDFLARE_ACCOUNT_HASH,
  CLOUDFLARE_STREAM_CUSTOMER_CODE
} from '@/environments';

export const CLOUDFLARE_IMAGE_URL = `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}`;
export const CLOUDFLARE_VIDEO_URL = `https://customer-${CLOUDFLARE_STREAM_CUSTOMER_CODE}.cloudflarestream.com`;

export const CLOUDFLARE_CREATE_VIDEO_UPLOAD_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT}/stream/direct_upload`;
