import { IS_PRODUCTION } from '@/environments';

import { CreateImageUploadController } from './create-image-upload';
import { CreateUploadController } from './create-upload';
import { CreateVideoUploadController } from './create-video-upload';
import { GetFileController } from './get-file';

const devControllers = !IS_PRODUCTION
  ? [GetFileController, CreateUploadController]
  : [];
export const UploadsControllers = [
  ...devControllers,
  CreateVideoUploadController,
  CreateImageUploadController
];
