import { IS_PRODUCTION } from '@/environments';

import { CreateImageUploadDevelopmentController } from './create-image-upload-development';
import { CreateVideoUploadController } from './create-video-upload';
import { CreateVideoUploadDevelopmentController } from './create-video-upload-development';
import { GetFileController } from './get-file';

const devControllers = !IS_PRODUCTION
  ? [
      GetFileController,
      CreateVideoUploadDevelopmentController,
      CreateImageUploadDevelopmentController
    ]
  : [];
export const UploadsControllers = [
  ...devControllers,
  CreateVideoUploadController
];
