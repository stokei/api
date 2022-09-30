import { existsSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';

import { FileUploadInterceptorModel } from '@/models/file-upload-interceptor.model';

export const localStorageFiles = diskStorage({
  destination: (request, file, callback) =>
    callback(null, new FileUploadInterceptorModel(request, file).destination),
  filename: (request, file, callback) =>
    callback(null, new FileUploadInterceptorModel(request, file).filename)
});

export const deleteFile = async (filePath: string): Promise<boolean> => {
  try {
    if (!existsSync(filePath)) {
      return false;
    }
    await unlinkSync(filePath);
    return true;
  } catch (err) {
    return false;
  }
};
