import { IS_PRODUCTION } from '@/environments';

import { CreateFileUploadController } from './create-file-upload';
import { CreateImageUploadDevelopmentController } from './create-image-upload-development';
import { CreateVideoUploadController } from './create-video-upload';
import { CreateVideoUploadDevelopmentController } from './create-video-upload-development';
import { GetFileController } from './get-file';

const productionControllers = [CreateVideoUploadController];
const developmentControllers = [
  GetFileController,
  CreateVideoUploadDevelopmentController,
  CreateImageUploadDevelopmentController
];

export const UploadsControllers = [
  ...(!IS_PRODUCTION ? developmentControllers : productionControllers),
  CreateFileUploadController
];
