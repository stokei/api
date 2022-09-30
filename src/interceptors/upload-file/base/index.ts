import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

interface BaseFilesInterceptorOptions {
  fieldName: string;
  storage: any;
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
}

function BaseFilesInterceptor(
  options: BaseFilesInterceptorOptions
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      const multerOptions: MulterOptions = {
        storage: options.storage,
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

export { BaseFilesInterceptor };
