import { IS_PRODUCTION } from '@/environments';

import { CreateUploadImageController } from './create-upload-image';
import { CreateUploadVideoController } from './create-upload-video';
import { GetImageController } from './get-image';
import { GetVideoController } from './get-video';

export const UploadsControllers = !IS_PRODUCTION
  ? [
      GetImageController,
      GetVideoController,
      CreateUploadImageController,
      CreateUploadVideoController
    ]
  : [];
