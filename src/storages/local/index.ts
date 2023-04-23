import { existsSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';

import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';

export const localStorageFiles = diskStorage({
  destination: (request, file, callback) =>
    callback(null, new FileUploadInterceptorModel(file).destination),
  filename: (request, file, callback) =>
    callback(null, new FileUploadInterceptorModel(file).generateFilename())
});

export const localDeleteFile = async (filename: string): Promise<boolean> => {
  try {
    if (!existsSync(filename)) {
      return false;
    }
    await unlinkSync(filename);
    return true;
  } catch (err) {
    return false;
  }
};
