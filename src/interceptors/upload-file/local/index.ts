import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

import { FileUpload } from '../base';

export const localStorageFiles = diskStorage({
  destination: (request, file, callback) =>
    callback(null, new FileUpload(request, file).destination),
  filename: (request, file, callback) =>
    callback(null, new FileUpload(request, file).filename)
});

interface LocalFilesInterceptorOptions {
  fieldName: string;
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
}

function LocalFilesInterceptor(
  options: LocalFilesInterceptorOptions
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      const multerOptions: MulterOptions = {
        storage: localStorageFiles,
        preservePath: true,
        fileFilter: options.fileFilter,
        limits: options.limits
      };

      this.fileInterceptor = new (FileInterceptor(
        options.fieldName,
        multerOptions
      ))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export { LocalFilesInterceptor };
