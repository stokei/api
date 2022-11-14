import { IS_PRODUCTION } from '@/environments';
import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';
import { cloudflareImageStorage } from '@/storages/cloudflare';
import { localDeleteFile, localStorageFiles } from '@/storages/local';

import { BaseFilesInterceptor } from './base';

interface FileUploaderInterceptorOptions {
  fieldName: string;
}

interface VideoUploaderInterceptorOptions {
  fieldName: string;
}

interface ImageUploaderInterceptorOptions {
  fieldName: string;
}

export const FileUploaderInterceptor = (
  options: FileUploaderInterceptorOptions
) =>
  BaseFilesInterceptor({
    fieldName: options.fieldName,
    storage: localStorageFiles
  });

export const VideoUploaderInterceptor = (
  options: VideoUploaderInterceptorOptions
) =>
  BaseFilesInterceptor({
    fieldName: options.fieldName,
    storage: localStorageFiles,
    fileFilter: (request, file, callback) =>
      new FileUploadInterceptorModel(file).filterVideo(callback)
  });

export const ImageUploaderInterceptor = (
  options: ImageUploaderInterceptorOptions
) =>
  BaseFilesInterceptor({
    fieldName: options.fieldName,
    storage: IS_PRODUCTION ? cloudflareImageStorage : localStorageFiles,
    fileFilter: (request, file, callback) =>
      new FileUploadInterceptorModel(file).filterImage(callback)
  });

export const deleteFileImage = localDeleteFile;
export const deleteFileVideo = localDeleteFile;
