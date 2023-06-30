import { CreateFileByAdminResolver } from './create-file-by-admin';
import { CreateImageUploadURLResolver } from './create-image-upload-url';
import { CreateVideoUploadURLResolver } from './create-video-upload-url';
import { UpdateFileResolver } from './update-file';

export const FilesMutations = [
  CreateVideoUploadURLResolver,
  CreateImageUploadURLResolver,
  UpdateFileResolver,
  CreateFileByAdminResolver
];
