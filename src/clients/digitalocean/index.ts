import { S3 } from '@aws-sdk/client-s3';

import {
  DIGITALOCEAN_SPACES_ENDPOINT,
  DIGITALOCEAN_SPACES_KEY,
  DIGITALOCEAN_SPACES_SECRET
} from '@/environments';

export const digitaloceanS3 = new S3({
  region: 'us-east-1',
  endpoint: 'https://' + DIGITALOCEAN_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: DIGITALOCEAN_SPACES_KEY,
    secretAccessKey: DIGITALOCEAN_SPACES_SECRET
  }
});
