import { IS_PRODUCTION } from '@/environments';
import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';
import { digitaloceanStorageFiles } from '@/storages/digital-ocean';
import { localStorageFiles } from '@/storages/local';

import { BaseFilesInterceptor } from './base';

interface VideoUploaderInterceptorOptions {
  fieldName: string;
}

interface ImageUploaderInterceptorOptions {
  fieldName: string;
}

export const VideoUploaderInterceptor = (
  options: VideoUploaderInterceptorOptions
) =>
  BaseFilesInterceptor({
    fieldName: options.fieldName,
    storage: IS_PRODUCTION ? digitaloceanStorageFiles : localStorageFiles,
    fileFilter: (request, file, callback) =>
      new FileUploadInterceptorModel(request, file).filterVideo(callback)
  });

export const ImageUploaderInterceptor = (
  options: ImageUploaderInterceptorOptions
) =>
  BaseFilesInterceptor({
    fieldName: options.fieldName,
    storage: IS_PRODUCTION ? digitaloceanStorageFiles : localStorageFiles,
    fileFilter: (request, file, callback) =>
      new FileUploadInterceptorModel(request, file).filterImage(callback)
  });
