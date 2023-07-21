import { S3Client } from '@aws-sdk/client-s3';

import { DIGITALOCEAN_KEY, DIGITALOCEAN_SECRET_KEY } from '@/environments';

export const s3Client = new S3Client({
  region: 'us-east-3',
  endpoint: 'https://nyc3.digitaloceanspaces.com',
  credentials: {
    accessKeyId: DIGITALOCEAN_KEY,
    secretAccessKey: DIGITALOCEAN_SECRET_KEY
  }
});
