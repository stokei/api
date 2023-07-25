import { CreateCloudflareImageUploadURLService } from './create-image-upload-url';
import { CreateCloudflareVideoUploadURLService } from './create-video-upload-url';
import { RemoveCloudflareImageService } from './remove-cloudflare-image';
import { RemoveCloudflareVideoService } from './remove-cloudflare-video';

export const CloudflareServices = [
  CreateCloudflareVideoUploadURLService,
  CreateCloudflareImageUploadURLService,
  RemoveCloudflareImageService,
  RemoveCloudflareVideoService
];
