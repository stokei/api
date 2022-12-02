import { IS_PRODUCTION } from '@/environments';

import { CreateUploadController } from './create-upload';
import { GetFileController } from './get-file';

export const UploadsControllers = !IS_PRODUCTION
  ? [GetFileController, CreateUploadController]
  : [];
