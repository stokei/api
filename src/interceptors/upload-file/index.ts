import { IS_DEVELOPMENT } from '@/environments';

import { FileUpload } from './base';
import { LocalFilesInterceptor } from './local';

interface VideoUploaderInterceptorOptions {
  fieldName: string;
}

interface ImageUploaderInterceptorOptions {
  fieldName: string;
}

export const VideoUploaderInterceptor = (
  options: VideoUploaderInterceptorOptions
) =>
  IS_DEVELOPMENT &&
  LocalFilesInterceptor({
    fieldName: options.fieldName,
    fileFilter: (request, file, callback) =>
      new FileUpload(request, file).filterVideo(callback)
  });

export const ImageUploaderInterceptor = (
  options: ImageUploaderInterceptorOptions
) =>
  IS_DEVELOPMENT &&
  LocalFilesInterceptor({
    fieldName: options.fieldName,
    fileFilter: (request, file, callback) =>
      new FileUpload(request, file).filterImage(callback)
  });
