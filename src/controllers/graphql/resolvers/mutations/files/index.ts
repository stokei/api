import { CreateImageUploadURLResolver } from './create-image-upload-url';
import { CreateVideoUploadURLResolver } from './create-video-upload-url';

export const FilesMutations = [
  CreateVideoUploadURLResolver,
  CreateImageUploadURLResolver
];
